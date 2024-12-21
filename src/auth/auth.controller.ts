import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Shop } from 'src/shops/shop.schema';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';
import { Public } from 'src/auth/decorators/auth.decorator';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @Permissions('0000')
  @Public()
  signIn(@Body() body: Omit<Shop, 'status' | 'verify'>) {
    return this.authService.signIn(body);
  }

  @Post('login')
  @Permissions('0000')
  @UseGuards(LocalAuthGuard)
  @Public()
  login(@Request() req: ExpressRequest) {
    let shop = req.user as Shop;
    return this.authService.login(shop);
  }

  @Get('profile')
  @Permissions('0000')
  async getProfile(@Request() req: ExpressRequest) {
    let shop = req.user as Shop;

    return this.authService.getProfile(shop.email)
  }
}
