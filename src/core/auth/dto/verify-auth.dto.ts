import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un email' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar una código' })
  @IsString()
  code: string;
}
