import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/schemas/company.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import Stripe from 'stripe';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    private readonly authService: AuthService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const stripe = new Stripe(process.env.STRIPE_KEY ?? '');
    const stripe_user = await stripe.customers.create({
      name: createCompanyDto.name,
      email: createCompanyDto.email,
      address: {
        line1: createCompanyDto.address,
      },
      phone: createCompanyDto.phone,
    });
    createCompanyDto.stripe_customer = stripe_user.id;
    const createdCompany = new this.companyModel(createCompanyDto);
    const newUser = createCompanyDto.user;
    newUser.company = createdCompany._id;

    await this.authService.register({
      email: newUser.email,
      password: newUser.password,
      user: newUser,
    });

    return createdCompany.save();
  }

  findAll() {
    return this.companyModel.find();
  }

  findOne(_id: string) {
    return this.companyModel.findOne({ _id });
  }

  update(_id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.findOneAndUpdate({ _id }, updateCompanyDto);
  }

  remove(_id: string) {
    return this.companyModel.findOneAndUpdate(
      { _id },
      {
        archived: true,
      },
    );
  }
}
