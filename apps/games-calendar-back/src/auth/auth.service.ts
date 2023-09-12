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
import * as bcrypt from 'bcrypt';
import { ResponseAPI, TYPE_EVENTS_EMAIL_NOTIFY } from '../types';
import { generateCodeConfirm } from '../utils';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateConfirmEventDto } from './dto/create-confirm-event.dto';
import { IUser, ThinUser } from "../users/types";

@Injectable()
export class AuthService {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailNotifyClient: ClientProxy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    const isMatch = await bcrypt.compare(data.password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUserDto): Promise<ResponseAPI<ThinUser>> {
    const { email, password } = data;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        `Пользователь с email ${email} уже существует`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = await generateCodeConfirm();
    const newUser = await this.usersService.create({
      email,
      hashedPassword,
      confirmationCode,
      isConfirm: false
    });

    this.emailNotifyClient.emit(
      TYPE_EVENTS_EMAIL_NOTIFY.SEND_CONFIRM_CODE,
      new CreateConfirmEventDto(email, confirmationCode),
    );
    return {
      message: 'User registered successfully',
      data: { email: newUser.email, isConfirm: newUser.isConfirm },
    };
  }

  async confirmAccount(data: ConfirmAccountDto): Promise<ResponseAPI<boolean>> {
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
      data: true,
    };
  }
}
