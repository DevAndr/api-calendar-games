import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Score } from '@server/scores/entities/scores.entity';
import { ScoreSchema } from '@server/scores/schema/Score.schema';
import { ScoresService } from '@server/scores/scores.service';
import { ScoresController } from '@server/scores/scores.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Score.name, schema: ScoreSchema, collection: 'scores' },
    ]),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
