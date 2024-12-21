import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyService } from 'src/api-key/api-key.service';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly apiKeyService: ApiKeyService,
  ) { }
  async getHello(): Promise<string> {
    // const newKey = await this.apiKeyService.createApiKey({
    //   key: crypto.randomBytes(16).toString('hex'),
    //   permissions: ['0000'],
    // });
    const port = +this.configService.get<string>('PORT') || 3000;
    return `<h1>Hello world ${port} </h1>`;
  }
}
