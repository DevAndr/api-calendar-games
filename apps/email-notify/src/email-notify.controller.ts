import { Controller } from '@nestjs/common';
import { EmailNotifyService } from './email-notify.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TYPE_EVENTS } from './types';
import { CreateUserEventDto } from './dto/create-user-event.dto';

@Controller()
export class EmailNotifyController {
  constructor(private readonly emailNotifyService: EmailNotifyService) {}

  @EventPattern(TYPE_EVENTS.SEND_CONFIRM_CODE)
  eventConfirmEmail(@Payload() data: CreateUserEventDto) {
    console.log('email notify', data);
    this.emailNotifyService.sendConfirmCode(data);
  }

  // @MessagePattern(TYPE_EVENTS.SEND_CONFIRM_CODE)
  // sendConfirmCode(data: CreateUserEventDto) {
  //   console.log('email notify:', data);
  // }
}
