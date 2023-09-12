import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log('create', createUserDto);
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(
    email: string,
  ): Promise<User & { _id: mongoose.Types.ObjectId }> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) return null;

    return {
      _id: user._id,
      email: user.email,
      hashedPassword: user.hashedPassword,
      confirmationCode: user.confirmationCode,
      isConfirm: user.isConfirm,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
