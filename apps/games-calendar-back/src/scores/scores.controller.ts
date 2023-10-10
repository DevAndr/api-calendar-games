import { Controller, Get, Post } from '@nestjs/common';
import { ScoresService } from '@server/scores/scores.service';
import { GetCurUID } from '@server/decorators';
import { Payload } from '@nestjs/microservices';
import { CreateScoreDto } from '@server/scores/dto/create-score.dto';
import { FindScoreDto } from '@server/scores/dto/find-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  scoresByUser(@GetCurUID() uid: string) {
    return this.scoresService.getALlByUser(uid);
  }

  @Post('find')
  getScoreByGameId(@GetCurUID() uid: string, @Payload() data: FindScoreDto) {
    return this.scoresService.findByGameId(uid, data);
  }

  @Post('add')
  addScoreByUser(@GetCurUID() uid: string, @Payload() data: CreateScoreDto) {
    return this.scoresService.create(uid, data);
  }
}
