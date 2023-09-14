import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly cs: ConfigService) {}
  getHello(): string {
    console.log(this.cs.get('port'));
    return 'Hello World!';
  }
}
