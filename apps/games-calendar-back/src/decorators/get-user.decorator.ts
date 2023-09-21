import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '@server/auth/types';

export const GetCurUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest();
      if (!data) return req.user;

      // if (!req?.user && data === 'refreshToken') return req.cookies[data];

      return req.user[data];
    }
  },
);
