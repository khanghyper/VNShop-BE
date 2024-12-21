import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShopsModule } from 'src/shops/shops.module';
import { ShopsService } from 'src/shops/shops.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { JwtStrategy } from 'src/auth/passport/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    ShopsModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Chỉ cần cấu hình mặc định nếu không sử dụng thuật toán bất đối xứng
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class AuthModule { }
