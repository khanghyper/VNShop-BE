import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions.decorator';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly apikeyService: ApiKeyService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler());
    if (!requiredPermissions) {
      return true; // Không yêu cầu quyền, tiếp tục xử lý
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];


    if (!apiKey) {
      throw new UnauthorizedException('API Key is required');
    }


    const apiKeyDocument = await this.apikeyService.getApiKey({ key: apiKey });
    if (!apiKeyDocument) {
      throw new ForbiddenException('Invalid or inactive API Key');
    }


    const hasPermission = requiredPermissions.every(permission =>
      apiKeyDocument.permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    console.log('permissions guard');

    return true;
  }
}
