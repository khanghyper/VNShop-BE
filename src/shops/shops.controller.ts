import { Controller } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }
}
