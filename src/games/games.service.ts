import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Game } from "./entities/game.entity";
import { Model } from "mongoose";

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  create(createGameDto: CreateGameDto) {
    return "This action adds a new game";
  }

  findAll() {
    return `This action returns all games`;
  }

  async findOne(id: number) {
    let result = await this.gameModel.findOne({ title: "Thirsty Suitors" });
    console.log(result);
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
