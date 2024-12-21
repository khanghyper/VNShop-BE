import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Apikey, ApikeySchema } from 'src/api-key/api-key.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apikey.name, schema: ApikeySchema }
    ])
  ],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
