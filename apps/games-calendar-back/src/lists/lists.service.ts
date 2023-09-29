import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { GameOfList, List } from './entities/list.entity';
import { ResponseAPI } from '@server/types';
import { ListGameThin } from '@server/lists/types';
import { AddGamesToListDto } from '@server/lists/dto/add-games-to-list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
  ) {}

  async create(
    createListDto: CreateListDto,
  ): Promise<ResponseAPI<ListGameThin>> {
    const list = await this.listModel.create(createListDto);
    return {
      error: null,
      message: null,
      data: {
        _id: list.id,
        uid: list.uid,
        name: list.name,
        description: list.description,
        games: list.games,
        access: list.access,
      },
    };
  }

  async findAll(uid: string): Promise<ResponseAPI<List[]>> {
    const lists = await this.listModel.find({ uid });
    console.log(lists[0].games);
    return {
      error: null,
      message: null,
      data: lists,
    };
  }

  findOne(id: string) {
    return this.listModel.findById(id);
  }

  update(id: string, updateListDto: UpdateListDto) {
    return this.listModel.findByIdAndUpdate(id, updateListDto);
  }

  async addGames(idList: string, payload: AddGamesToListDto) {
    return this.listModel.findByIdAndUpdate(
      idList,
      {
        $addToSet: {
          games: {
            $each: payload.ids.map((id) => ({
              id: new Types.ObjectId(id),
              rating: 0,
            })),
          },
        },
      },
      { returnDocument: 'after' },
    );
  }

  remove(id: string) {
    return this.listModel.findByIdAndRemove(new Types.ObjectId(id));
  }
}
