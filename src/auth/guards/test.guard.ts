import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from 'src/api-key/api-key.service';


@Injectable()
export class TestGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly apikeyService: ApiKeyService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const test = request.headers['test'];
    if (!test) {
      throw new UnauthorizedException('Test is required');
    }


    return true;
  }
}
