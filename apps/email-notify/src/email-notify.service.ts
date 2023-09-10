import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailNotifyService {
  getHello(): string {
    return 'Hello World!';
  }
}
