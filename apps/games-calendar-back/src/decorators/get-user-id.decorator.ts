import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@server/auth/types';

export const GetCurUID = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): string => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user as JwtPayload;
      return user.sub;
    }
  },
);
