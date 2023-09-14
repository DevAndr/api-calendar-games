import { Prop, Schema } from '@nestjs/mongoose';
import { ACCESS } from '../../types';
import { IListGame } from '@server/lists/types';
import mongoose, { Document } from 'mongoose';
import { User } from '@server/users/entities/user.entity';

export type ListDocument = Document & IListGame;

@Schema()
export class GameOfList {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  @Prop({ type: String })
  id: string;
  @Prop({ type: Number })
  rating: number;
}

@Schema()
export class List implements IListGame {
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  access: ACCESS.PUBLIC | ACCESS.PRIVATE;
  @Prop()
  games: GameOfList[];
  @Prop({ type: String })
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  uid: User;
}
