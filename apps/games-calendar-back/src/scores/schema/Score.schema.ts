import { SchemaFactory } from '@nestjs/mongoose';
import { Score } from '@server/scores/entities/scores.entity';

export const ScoreSchema = SchemaFactory.createForClass(Score);
