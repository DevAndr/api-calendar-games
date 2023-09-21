import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { GetCurUID } from '@server/decorators';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post('createList')
  create(@GetCurUID() uid: string, @Payload() createListDto: CreateListDto) {
    return this.listsService.create({ ...createListDto, uid });
  }

  @Get('findAllLists')
  findAll(@GetCurUID() uid: string): Promise<any> {
    return this.listsService.findAll(uid);
  }

  @Get('findOneList/:id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post('updateList')
  update(@Payload() updateListDto: UpdateListDto) {
    return this.listsService.update(updateListDto.id, updateListDto);
  }

  @Delete('removeList')
  remove(@Payload() id: string) {
    return this.listsService.remove(id);
  }
}
