import { Prop, Schema } from '@nestjs/mongoose';
import { ThinUser } from '../types';

@Schema()
export class User implements ThinUser {
  @Prop({ required: true, unique: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  hashedPassword: string;
  confirmationCode?: number;
  isConfirm: boolean;
}
