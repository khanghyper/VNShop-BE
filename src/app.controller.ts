import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { Public } from 'src/auth/decorators/auth.decorator';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // @Permissions('0000', '1111')
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('public')
  @Permissions('0000')
  @Public()
  @UseGuards(LocalAuthGuard)
  async getPublic(): Promise<string> {
    return await this.appService.getHello();
  }
}
