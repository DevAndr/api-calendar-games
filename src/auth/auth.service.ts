import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {
    }

    async signIn(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
