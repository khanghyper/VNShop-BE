import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/shops/shop.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>,
  ) { }

  async findShopByEmail(email: string): Promise<any> {
    return this.shopModel.findOne({ email }).lean().exec();
  }

  async findShopById(id: string): Promise<any> {
    return this.shopModel.findById(id).lean().exec();
  }


  async createShop(shop: Omit<Shop, 'status' | 'verify' | '_id'>): Promise<Shop> {
    const newShop = await this.shopModel.create(shop);
    return newShop.save();
  }

  async addRefreshTokenUsed(refreshToken: string, email: string): Promise<any> {
    const filter = { email },
      update = { refreshTokensUsed: [], refreshToken },
      options = { upsert: true, new: true };

    return this.shopModel.updateOne(filter, update, options).exec();
  }

}
