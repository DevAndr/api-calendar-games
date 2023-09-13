import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@server/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@server/users/users.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourAccessSecretKey',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
