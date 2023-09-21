import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@server/users/users.service';
import { JwtPayload } from '@server/auth/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'yourRefreshSecretKey',
    });
  }

  async validate(@Request() req: Request, payload: JwtPayload) {
    // console.log('RefreshTokenStrategy', payload);
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
