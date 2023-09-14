import { HydratedDocument } from 'mongoose';
import { Game } from '../entities/game.entity';
import { SchemaFactory } from '@nestjs/mongoose';

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
