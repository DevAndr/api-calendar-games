import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { from, Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello() {
    return { users: [] };
  }

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): Observable<number> {
    return from([1, 2, 3]);
  }
}
