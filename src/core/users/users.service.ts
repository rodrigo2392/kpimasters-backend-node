import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(_id: string) {
    return this.userModel.findOne({ _id });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id }, updateUserDto);
  }

  remove(_id: string) {
    return this.userModel.findOneAndDelete({ _id });
  }

  getProfile(cognito_id: string) {
    return this.userModel.findOne({ cognito_id }).populate('company');
  }
}
