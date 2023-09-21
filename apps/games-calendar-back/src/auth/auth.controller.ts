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
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @PublicDecorator()
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Req() req: Request, @Body() loginDto: LoginDto) {
    const auth = await this.authService.signIn(loginDto);

    if (auth?.data?.tokens) {
      await this.authService.setTokensCookie(req, auth.data.tokens);
    }

    return auth;
  }

  @PublicDecorator()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Req() req: Request,
    @Body() data: CreateUserDto,
  ): Promise<ResponseAPI<AuthUser>> {
    const sign = await this.authService.signUp(data);
    await this.authService.setTokensCookie(req, sign?.data?.tokens);
    return sign;
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
    await this.authService.setTokensCookie(req, tokens);
    return {
      data: tokens,
    };
  }

  @Get('check')
  @UseGuards(ATGuard)
  @HttpCode(HttpStatus.OK)
  async checkAuth(@GetCurUID() uid: string): Promise<boolean> {
    console.log(uid);
    return true;
  }
}
