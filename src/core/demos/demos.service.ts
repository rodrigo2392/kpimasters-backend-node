import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Demo } from 'src/schemas/demo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { PageDto, PageMetaDto, PageOptionsDto } from '../pagination';
import { PermissionLevel } from '../users/dto/create-user.dto';

@Injectable()
export class DemosService {
  constructor(
    @InjectModel(Demo.name) private demoModel: Model<Demo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createDemoDto: CreateDemoDto, cognito_id: string) {
    const currentUser = await this.userModel.findOne({ cognito_id });
    if (!currentUser) {
      throw new Error('user not found');
    }
    const company = currentUser?.company;
    const createdDemo = new this.demoModel({
      ...createDemoDto,
      company: company,
      notes: createDemoDto.notes === '' ? [] : [createDemoDto.notes],
      user: currentUser._id,
    });
    return createdDemo.save();
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.demoModel.countDocuments({ archived: false });
    const data = await this.demoModel
      .find({ archived: false })
      .sort({ createdAt: pageOptionsDto.order })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }

  findAllArchived() {
    return this.demoModel.find({ archived: true });
  }

  findOne(_id: string) {
    return this.demoModel.findOne({ _id });
  }

  update(_id: string, updateDemoDto: UpdateDemoDto) {
    return this.demoModel
      .findOneAndUpdate(
        { _id },
        {
          ...updateDemoDto,
          $push: {
            notes: updateDemoDto.notes !== '' ? updateDemoDto.notes : null,
          },
        },
      )
      .exec();
  }

  remove(_id: string) {
    return this.demoModel
      .findOneAndUpdate(
        { _id },
        {
          archived: true,
        },
      )
      .exec();
  }

  async getSellers(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.userModel.countDocuments({
      permission_level: PermissionLevel.SELLER_PERMISSION,
    });
    const data = await this.userModel
      .find({ permission_level: PermissionLevel.SELLER_PERMISSION })
      .sort({ createdAt: pageOptionsDto.order })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(data, pageMetaDto);
  }
}
