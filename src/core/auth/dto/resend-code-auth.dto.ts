import { IsNotEmpty, IsString } from 'class-validator';

export class ResendCodeAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un email' })
  @IsString()
  email: string;
}
