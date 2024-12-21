import { BadRequestException, Injectable } from '@nestjs/common';
import { Shop } from 'src/shops/shop.schema';
import { ShopsService } from 'src/shops/shops.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getInfoData } from 'src/utils';

const RoleShop = {
  ADMIN: 'ADMIN',
  SHOP: 'SHOP',
  WRITER: 'WRITER',
}

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly shopsService: ShopsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async hashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  createTokenPair = async (payload: any) => {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d',
      })
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '7d',
      })


      return { accessToken, refreshToken };

    } catch (error) {
      console.log(error);
    }
  }


  signIn = async (data: Omit<Shop, 'status' | 'verify'>) => {
    const { email } = data;
    const holderShop = await this.shopsService.findShopByEmail(email);
    if (holderShop) {
      throw new BadRequestException('Email is already in use');
    }
    const newShop = await this.shopsService.createShop({
      ...data,
      password: await this.hashPassword(data.password),
      roles: [RoleShop.SHOP],
    });

    // const tokens = await this.createTokenPair({ userId: newShop._id.toString(), roles: newShop.roles });


    return {
      data: {
        shop: getInfoData({ data: newShop, fields: ['_id', 'email', 'name', 'roles'] }),
      },
    };
  }

  login = async (shop: Shop) => {
    const { email, _id, roles } = shop;


    const tokens = await this.createTokenPair({ _id: _id.toString(), email, roles });

    await this.shopsService.addRefreshTokenUsed(tokens.refreshToken, email);

    return {
      data: {
        shop: getInfoData({ data: shop, fields: ['_id', 'email', 'name', 'roles'] }),
        tokens: tokens,
      },
    };
  }

  validateShop = async ({ email, password }: { email: string, password: string }) => {
    const holderShop = await this.shopsService.findShopByEmail(email);
    const isValid = await this.comparePassword(password, holderShop.password);

    if (!holderShop || !isValid) return null;

    return holderShop;
  }

  getProfile = async (email: string) => {
    const foundShop = await this.shopsService.findShopByEmail(email);
    return {
      data: {
        shop: getInfoData({ data: foundShop, fields: ['_id', 'email', 'name', 'roles'] }),
      },
    }
  }
}
