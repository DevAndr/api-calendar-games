import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseAPI } from '../types';
import { Public } from '@server/decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Public()
  @Post('register')
  signUp(@Body() data: CreateUserDto): Promise<ResponseAPI<any>> {
    console.log(data);
    return this.authService.signUp(data);
  }

  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    // const userId = req.user['sub'];
    // const refreshToken = req.user['refreshToken'];
    // return this.authService.refreshTokens(userId, refreshToken);
  }
}
