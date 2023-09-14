import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@server/users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@server/auth/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourAccessSecretKey',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // const user = await this.userService.findById(payload.sub);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return payload;
  }
}
