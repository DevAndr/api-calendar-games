import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '@server/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  getRequest(ctx: ExecutionContext): any {
    if (ctx.getType() === 'http') {
      return ctx.switchToHttp().getRequest();
    }
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.cookies['accessToken'];
    const refreshToken = request.cookies['refreshToken'];

    if (accessToken) {
      ctx.switchToHttp().getRequest().headers[
        'authorization'
      ] = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      // this.authService.ref(refreshToken);
    }

    console.log('JwtAuthGuard', accessToken, refreshToken);

    return isPublic || super.canActivate(ctx);
  }
}
