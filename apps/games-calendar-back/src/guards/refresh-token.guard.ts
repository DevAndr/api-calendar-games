import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RTGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('RTGuard');

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      const refreshToken = request.cookies['refreshToken'];

      if (refreshToken) {
        request.headers['Authorization'] = `Bearer ${refreshToken}`;
        console.log(this.jwtService.decode(refreshToken));
        request.user = this.jwtService.decode(refreshToken);
      }
      // context.switchToHttp().getRequest().headers['Authorization'] = `Bearer ${request.cookie}`;
      // console.log(request.cookies['refreshToken']);
      return request;
    }

    return super.canActivate(context);
  }
}
