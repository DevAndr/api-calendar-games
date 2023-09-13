import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from "@nestjs/jwt";
import {AccessTokenStrategy, RefreshTokenStrategy} from "@server/auth/strategy";

@Module({
    imports: [JwtModule.register({}), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
