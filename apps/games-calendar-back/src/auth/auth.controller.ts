import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseAPI } from '../types';
import { PublicDecorator } from '@server/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { GetCurUID, GetCurUser } from '@server/decorators';
import { RTGuard } from '@server/guards/refresh-token.guard';
import { ATGuard } from '@server/guards/access-token.guard';
import { ITokens } from '@server/auth/types';
import { AuthUser } from '@server/users/types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @PublicDecorator()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @PublicDecorator()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() data: CreateUserDto): Promise<ResponseAPI<AuthUser>> {
    return this.authService.signUp(data);
  }

  @Post('logOut')
  @UseGuards(ATGuard)
  @HttpCode(HttpStatus.OK)
  async logOutLocal(@GetCurUID() uid: string) {
    return this.authService.logOut(uid);
  }

  @Get('refresh')
  @PublicDecorator()
  @UseGuards(RTGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @GetCurUID() uid: string,
    @GetCurUser('refreshToken') refreshToken: string,
  ): Promise<ResponseAPI<ITokens>> {
    const tokens = await this.authService.refreshTokens(uid, refreshToken);
    return {
      data: tokens,
    };
  }
}
