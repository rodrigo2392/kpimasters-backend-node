import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
import { IsMongoIdObject } from 'src/decorators/mongoid.validator';

enum Role {
  OWNER = 1,
  ADMIN = 2,
  USER = 3,
}

export enum PermissionLevel {
  USER_PERMISSION = 1,
  CLIENT_SERVICE_PERMISSION = 2,
  RECRUITER_PERMISSION = 3,
  SELLER_PERMISSION = 4,
  TELEMARKETING_PERMISSION = 5,
  ASSISTANT_PERMISSION = 6,
  ADMIN_PERMISSION = 7,
  OWNER_PERMISSION = 8,
  SUPER_ADMIN_PERMISSION = 9,
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  cognito_id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNumber()
  role: Role;

  @IsOptional()
  @IsNumber()
  permission_level: PermissionLevel;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @IsMongoIdObject({ message: 'La empresa debe tener un id válido' })
  company: mongoose.Types.ObjectId;
}
