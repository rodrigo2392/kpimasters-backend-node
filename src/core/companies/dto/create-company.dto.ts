import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact_name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsNotEmpty()
  @IsString()
  distributor_id: string;

  @IsOptional()
  @IsString()
  stripe_customer?: string;

  @IsOptional()
  @IsString()
  striper_suscription?: string;

  @IsNotEmpty()
  user: CreateUserDto;
}
