import {Controller, Get} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @MessagePattern('createGame')
  create(@Payload() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @MessagePattern('findAllGames')
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('5')
  findOne(@Payload() id: number) {
    return this.gamesService.findOne(id);
  }

  @MessagePattern('updateGame')
  update(@Payload() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(updateGameDto.id, updateGameDto);
  }

  @MessagePattern('removeGame')
  remove(@Payload() id: number) {
    return this.gamesService.remove(id);
  }
}
