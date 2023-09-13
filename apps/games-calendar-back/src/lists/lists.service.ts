import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../games/entities/game.entity';
import { Model } from 'mongoose';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
  ) {}
  async create(createListDto: CreateListDto) {
    return this.listModel.create(createListDto);
  }

  findAll(uid: string) {
    return this.listModel.find({ uid });
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
