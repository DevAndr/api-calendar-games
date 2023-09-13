import { Prop, Schema } from '@nestjs/mongoose';
import { IUser } from '../types';

@Schema()
export class User implements IUser {
  @Prop({ required: true, unique: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  @Prop({ type: String })
  hashedPassword: string;
  @Prop({ type: String, required: false })
  confirmationCode: string;
  @Prop({ type: String })
  isConfirm: boolean;
  @Prop({ type: String })
  hashRefreshToken: string;
}
