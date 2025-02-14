import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company> & {
  _id: mongoose.Types.ObjectId;
};

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop()
  contact_name: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  logo: string;

  @Prop()
  rfc: string;

  @Prop()
  distributor_id: string;

  @Prop()
  stripe_customer: string;

  @Prop()
  striper_suscription: string;

  @Prop()
  archived: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
