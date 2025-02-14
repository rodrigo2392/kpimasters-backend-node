import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from './company.schema';
import { User } from './user.schema';

export type DemoDocument = HydratedDocument<Demo> & {
  _id: mongoose.Types.ObjectId;
};

@Schema({ timestamps: true })
export class Demo {
  @Prop()
  contact_name: string;

  @Prop()
  address: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: [String] })
  notes: string[];

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ default: false })
  archived: boolean;
}

export const DemoSchema = SchemaFactory.createForClass(Demo);
