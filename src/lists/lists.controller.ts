import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @MessagePattern('createList')
  create(@Payload() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @MessagePattern('findAllLists')
  findAll() {
    return this.listsService.findAll();
  }

  @MessagePattern('findOneList')
  findOne(@Payload() id: number) {
    return this.listsService.findOne(id);
  }

  @MessagePattern('updateList')
  update(@Payload() updateListDto: UpdateListDto) {
    return this.listsService.update(updateListDto.id, updateListDto);
  }

  @MessagePattern('removeList')
  remove(@Payload() id: number) {
    return this.listsService.remove(id);
  }
}
