import { HydratedDocument } from 'mongoose';
import { User } from '../entities/user.entity';
import { SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
