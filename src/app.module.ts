import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { ApiKeyMiddleware } from 'src/middlewares/apikey.middleware';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { TestGuard } from 'src/auth/guards/test.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(`mongodb://${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}/${configService.get('DATABASE_NAME')}`);
        return {
          uri: `mongodb://${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}/${configService.get('DATABASE_NAME')}`,
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ShopsModule,
    AuthModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard, // Global middleware - api key
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Global middleware - jwt
    }
  ],
})
export class AppModule { }
