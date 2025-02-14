import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from './company.schema';

export type UserDocument = HydratedDocument<User> & {
  _id: mongoose.Types.ObjectId;
};

@Schema()
export class User {
  @Prop()
  cognito_id: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 3 })
  role: number;

  @Prop({ default: 1 })
  permission_level: number;

  @Prop()
  profile_picture: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
