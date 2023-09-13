import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { ResponseAPI, TYPE_EVENTS_EMAIL_NOTIFY } from '../types';
import { generateCodeConfirm } from '../utils';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateConfirmEventDto } from './dto/create-confirm-event.dto';
import { AuthUser } from '../users/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailNotifyClient: ClientProxy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto): Promise<ResponseAPI<AuthUser>> {
    const user = await this.usersService.findByEmail(data.email);
    const isMatch = await argon2.verify(data.password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    return {
      message: 'User sig in successfully',
      data: { email: user.email, isConfirm: user.isConfirm, tokens },
    };
  }

  async signUp(data: CreateUserDto): Promise<ResponseAPI<AuthUser>> {
    const { email, password } = data;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        `Пользователь с email ${email} уже существует`,
      );
    }

    const hashedPassword = await this.hashData(password);
    const confirmationCode = await generateCodeConfirm();
    const newUser = await this.usersService.create({
      email,
      hashedPassword,
      confirmationCode,
      isConfirm: false,
    });

    this.emailNotifyClient.emit(
      TYPE_EVENTS_EMAIL_NOTIFY.SEND_CONFIRM_CODE,
      new CreateConfirmEventDto(email, confirmationCode),
    );

    const tokens = await this.getTokens(newUser._id.toString(), newUser.email);
    await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);

    return {
      message: 'User registered successfully',
      data: { email: newUser.email, isConfirm: newUser.isConfirm, tokens },
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(uid: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateHashRT(uid, hashedRefreshToken);
  }

  async getTokens(uid: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: uid,
          email,
        },
        {
          secret: 'yourAccessSecretKey',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: uid,
          email,
        },
        {
          secret: 'yourRefreshSecretKey',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async confirmAccount(
    data: ConfirmAccountDto,
  ): Promise<ResponseAPI<{ confirm: boolean }>> {
    const existingUser = await this.usersService.findOne(data.uid);
    if (existingUser) {
      throw new BadRequestException(`Пользователь c uid ${data.uid} не найден`);
    }

    if (
      !existingUser.isConfirm &&
      existingUser.confirmationCode !== data.code
    ) {
      throw new BadRequestException(`Не верный код подтверждения`);
    }

    existingUser.isConfirm = true;
    existingUser.confirmationCode = undefined;
    await existingUser.save();

    return {
      message: 'Аккауни успешно подтвержден',
      data: {
        confirm: true,
      },
    };
  }
}
