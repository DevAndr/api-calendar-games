import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from '@server/scores/entities/scores.entity';
import { Model, Types } from 'mongoose';
import { CreateScoreDto } from '@server/scores/dto/create-score.dto';
import { ResponseAPI } from '@server/types';
import { ScoreDto } from '@server/scores/dto/score.dto';
import { FindScoreDto } from '@server/scores/dto/find-score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
  ) {}

  async create(
    uid: string,
    data: CreateScoreDto,
  ): Promise<ResponseAPI<ScoreDto>> {
    const scoreGame = await this.scoreModel.create({
      game: data.idGame,
      value: data.value,
      user: uid,
    });

    return {
      data: {
        id: scoreGame._id.toString(),
        uid: scoreGame.user._id.toString(),
        idGame: scoreGame.game._id.toString(),
        value: scoreGame.value,
      },
    };
  }

  async getALlByUser(uid: string): Promise<ResponseAPI<ScoreDto[]>> {
    const scores = await this.scoreModel.find({ user: uid });
    return {
      data: scores.map((s) => ({
        id: s._id.toString(),
        value: s.value,
        idGame: s.game._id.toString(),
        uid: s.user._id.toString(),
      })),
    };
  }

  async findByGameId(
    uid: string,
    data: FindScoreDto,
  ): Promise<ResponseAPI<ScoreDto>> {
    const scores = await this.scoreModel
      .findOne({
        user: uid,
        game: data.idGame,
      })
      .exec();

    return {
      data: {
        id: scores._id.toString(),
        uid: scores.user._id.toString(),
        idGame: scores.game._id.toString(),
        value: scores.value,
      },
    };
  }
}
