import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const excludedRoutes = ['/'];
    if (excludedRoutes.includes(request.url)) {
      return next.handle(); // Skip interceptor for these routes
    }
    return next.handle().pipe(
      map((data) => {
        return {
          code: data?.code || 'SUCESS', // Mặc định thành công
          data: data?.data || null, // Dữ liệu trả về
          message: data?.message || 'OK', // Thông báo mặc định
        };
      }),
    );
  }
}
