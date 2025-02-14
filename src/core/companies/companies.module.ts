import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/schemas/company.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, AuthService, UsersService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
