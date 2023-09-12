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
  create(createListDto: CreateListDto) {
    return 'This action adds a new list';
  }

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
