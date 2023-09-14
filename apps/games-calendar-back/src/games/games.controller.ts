import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { QueryPaginationDto, SearchGameDto } from './types';
import { ResponsePaginationAPI } from '../types';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('createGame')
  create(@Payload() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('getGames')
  async getGames(
    @Query() query: QueryPaginationDto,
  ): Promise<ResponsePaginationAPI<Game[]>> {
    return this.gamesService.findGamesWithPagination(query);
  }

  @Get('findAllGames')
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('/id/:id')
  findById(@Param('id') id: string) {
    return this.gamesService.findById(id);
  }

  @Get('search')
  searchGame(@Query() query: SearchGameDto) {
    return this.gamesService.searchGame(query);
  }

  @Put('updateGame')
  update(@Payload() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(updateGameDto.id, updateGameDto);
  }

  @Delete('removeGame')
  remove(@Payload() id: number) {
    return this.gamesService.remove(id);
  }
}
