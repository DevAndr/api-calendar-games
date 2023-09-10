import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model, Schema} from "mongoose";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor( @InjectModel(User.name) private readonly userModel: Model<User>,) {
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string): Promise<User & { _id:  mongoose.Types.ObjectId }> {
    const user = await this.userModel.find({email}).exec()
    return  {
      _id: user.at(0)._id,
      email: user.at(0).email,
      password: user.at(0).password,
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
