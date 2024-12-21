import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly apikeyService: ApiKeyService,
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key']; // Hoặc header/key theo ý bạn

    if (!apiKey || !(await this.apikeyService.validateApiKey({ key: apiKey as string }))) {
      throw new ForbiddenException('Invalid API Key');
    }

    next();
  }
}
