import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '@server/users/entities/user.entity';
import mongoose from 'mongoose';
import { Game } from '@server/games/entities/game.entity';
import { GameDocument } from '@server/games/schema/Game.schema';
import { UserDocument } from '@server/users/schema/User.schema';

@Schema()
export class Score {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  game: GameDocument;
  @Prop({ type: Number })
  value: number;
}
