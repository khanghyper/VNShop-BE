import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apikey, ApikeyDocument } from 'src/api-key/api-key.schema';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(Apikey.name) private readonly apikeyModel: Model<Apikey>
  ) { }

  async createApiKey(data: { key: string, permissions: string[] }): Promise<Apikey> {
    return await this.apikeyModel.create({ ...data, status: true });
  }
  async validateApiKey({ key, status = true }: { key: string, status?: boolean }): Promise<boolean> {
    const apiKey = await this.apikeyModel.findOne({ key: key, status });
    return !!apiKey; // Trả về `true` nếu tìm thấy API Key hợp lệ
  }
  async getApiKey({ key, status = true }: { key: string, status?: boolean }): Promise<Apikey> {
    const apikey = await this.apikeyModel.findOne({ key: key, status });
    return apikey
  }
}
