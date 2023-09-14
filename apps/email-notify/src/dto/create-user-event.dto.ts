import { IEvent } from '../types';

export class CreateUserEventDto implements IEvent {
  email: string;
  confirmationCode: string;
}
