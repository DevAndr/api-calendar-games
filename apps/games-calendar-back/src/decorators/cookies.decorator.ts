import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        if (ctx.getType() === "http") {
            const request = ctx.switchToHttp().getRequest().req;
            return data ? request.cookies?.[data] : request.cookies;
        }
    });