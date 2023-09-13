import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(ctx: ExecutionContext): any {
        if (ctx.getType() === 'http') {
            const request = ctx.switchToHttp().getRequest();
            console.log("http");

            return request;
        }
    }

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            ctx.getHandler(),
            ctx.getClass()
        ]);

        return isPublic || super.canActivate(ctx)
    }
}