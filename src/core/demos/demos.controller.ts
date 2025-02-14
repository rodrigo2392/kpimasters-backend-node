import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DemosService } from './demos.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from '../pagination';

@Controller('demos')
@ApiBearerAuth()
@Authentication()
export class DemosController {
  constructor(private readonly demosService: DemosService) {}

  @Post()
  create(
    @Body() createDemoDto: CreateDemoDto,
    @CognitoUser('username') cognito_user: string,
  ) {
    return this.demosService.create(createDemoDto, cognito_user);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.demosService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demosService.update(id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demosService.remove(id);
  }

  @Get('/search/sellers')
  getSellers(@Query() pageOptionsDto: PageOptionsDto) {
    return this.demosService.getSellers(pageOptionsDto);
  }
}
