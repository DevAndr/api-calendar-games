import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './entities/list.entity';
import { ResponseAPI } from '@server/types';
import { ListGameThin } from '@server/lists/types';

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

  remove(id: string) {
    return this.listModel.findByIdAndRemove(id);
  }
}
