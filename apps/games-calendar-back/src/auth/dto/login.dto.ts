import { IS_STRONG_PASSWORD, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  password: string;
}
