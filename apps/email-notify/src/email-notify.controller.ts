import { Controller, Get } from '@nestjs/common';
import { EmailNotifyService } from './email-notify.service';
import { EventPattern } from '@nestjs/microservices';
import { TYPE_EVENTS } from './types';
import { CreateUserEventDto } from './dto/create-user-event.dto';

@Controller()
export class EmailNotifyController {
  constructor(private readonly emailNotifyService: EmailNotifyService) {}

  @Get()
  getHello(): string {
    return this.emailNotifyService.getHello();
  }

  @EventPattern(TYPE_EVENTS.SEND_CONFIRM_CODE)
  sendConfirmCode(data: CreateUserEventDto) {
    console.log('email notify', data);
  }
}
