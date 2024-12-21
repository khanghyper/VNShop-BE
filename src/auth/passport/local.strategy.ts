import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { use } from "passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { Shop } from "src/shops/shop.schema";
import { ShopsService } from "src/shops/shops.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const shop = await this.authService.validateShop({ email, password });

    if (!shop) {
      throw new UnauthorizedException('Invalid Shop');
    }

    return shop;
  }
}