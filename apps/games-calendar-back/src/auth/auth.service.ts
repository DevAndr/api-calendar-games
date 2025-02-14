import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
import { ITokens } from '@server/auth/types';
import { Request } from 'express';

@Injectable()
export class AuthService {
  accessTokenExp = '30m';
  refreshTokenExp = '7d';
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailNotifyClient: ClientProxy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto): Promise<ResponseAPI<AuthUser>> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user)
      throw new ConflictException(
        `Пользователь с email ${data.email} не существует`,
      );

    console.log(user);

    const isMatch = await argon2.verify(user.hashedPassword, data.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    console.log(tokens);
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
          expiresIn: this.accessTokenExp,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: uid,
          email,
        },
        {
          secret: 'yourRefreshSecretKey',
          expiresIn: this.refreshTokenExp,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(uid: string, refreshToken: string): Promise<ITokens> {
    const user = await this.usersService.findById(uid);
    if (!user || !user.hashRefreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.hashRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async ref(refreshToken: string) {
    console.log(this.jwtService.decode(refreshToken));
  }

  async logOut(uid: string) {
    this.usersService.update(uid, { hashRefreshToken: null });
  }

  async setTokensCookie(req: Request, tokens: ITokens) {
    // if (tokens) {
    console.log('setTokensCookie', tokens, req.res.cookie);
    req.res.cookie('accessToken', `${tokens.accessToken}`, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    });

    req.res.cookie('refreshToken', `${tokens.refreshToken}`, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    // }
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
