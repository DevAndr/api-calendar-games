import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseAPI } from '../types';
import { generateCodeConfirm } from '../utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('register')
  signUp(@Body() data: CreateUserDto): Promise<ResponseAPI<any>> {
    console.log(data);
    console.log(generateCodeConfirm());
    return this.authService.signUp(data);
  }
}
