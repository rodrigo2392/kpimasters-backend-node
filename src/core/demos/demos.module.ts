import { Module } from '@nestjs/common';
import { DemosService } from './demos.service';
import { DemosController } from './demos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Demo, DemoSchema } from 'src/schemas/demo.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [DemosController],
  providers: [DemosService],
})
export class DemosModule {}
