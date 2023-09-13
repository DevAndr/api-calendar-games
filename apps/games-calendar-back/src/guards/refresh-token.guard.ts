import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RTGuard extends AuthGuard('jwt-refresh') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        if (context.getType() === 'http') {
            return context.switchToHttp().getRequest()
        }

        return super.canActivate(context);
    }
}
