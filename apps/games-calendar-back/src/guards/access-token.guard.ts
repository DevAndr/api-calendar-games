import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@server/decorators/constants';

@Injectable()
export class ATGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // getRequest(ctx: ExecutionContext): any {
  //   console.log('ATGuard');
  //   if (ctx.getType() === 'http') {
  //     const request = ctx.switchToHttp().getRequest();
  //     console.log('http');
  //
  //     return request;
  //   }
  // }

  canActivate(context: ExecutionContext) {
    console.log('ATGuard');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic || super.canActivate(context);
  }
}
