import { Controller, Get } from '@nestjs/common';
import { EmailNotifyService } from './email-notify.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailNotifyController {
  constructor(private readonly emailNotifyService: EmailNotifyService) {}


  @MessagePattern({ cmd: 'email' })
  send() {
    console.log('email service');
  }
}
