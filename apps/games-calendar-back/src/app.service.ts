import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(@Inject('email_service') private client: ClientProxy) {
  }
  getHello(): any {
    this.client.emit('email', 'hello');
    return {data: ""};
  }
}
