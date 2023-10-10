import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { GetCurUID, PublicDecorator } from '@server/decorators';
import { AddGamesToListDto } from '@server/lists/dto/add-games-to-list.dto';
import { ResponseAPI } from '@server/types';
import { ListGameThin } from '@server/lists/types';
import { GameOfList, List } from '@server/lists/entities/list.entity';
import { GamesService } from '@server/games/games.service';
import { Game } from '@server/games/entities/game.entity';

@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly gamesService: GamesService,
  ) {}

  @Post('createList')
  create(@GetCurUID() uid: string, @Payload() createListDto: CreateListDto) {
    return this.listsService.create({ ...createListDto, uid });
  }

  @Get('findAllLists')
  findAll(@GetCurUID() uid: string) {
    return this.listsService.findAll(uid);
  }

  @Get('findOneList/:id')
  async findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post('updateList')
  update(@Payload() updateListDto: UpdateListDto) {
    return this.listsService.update(updateListDto.id, updateListDto);
  }

  @Post('addGames/:id')
  async addGames(
    @Param('id') idList: string,
    @Payload() payload: AddGamesToListDto,
  ): Promise<ResponseAPI<List>> {
    return this.listsService
      .addGames(idList, payload)
      .then((data) => {
        return {
          error: '',
          data: data,
          message: '',
        };
      })
      .catch((e) => ({
        error: '',
        data: e,
        message: '',
      }));
  }

  @Get('gamesByList/:id')
  async getGamesByIdList(
    @Param('id') idList: string,
  ): Promise<ResponseAPI<Game[]>> {
    const list = await this.listsService.findOne(idList);
    const games = await this.gamesService.findGamesByIds(
      list.games.map((g) => g.id),
    );

    return {
      message: '',
      error: null,
      data: games,
    };
  }

  @Post('removeList')
  remove(@Payload() id: string) {
    return this.listsService.remove(id);
  }
}
