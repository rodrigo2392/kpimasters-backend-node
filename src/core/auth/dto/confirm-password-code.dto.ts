import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPasswordCodeAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un email' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Debes ingresar un código' })
  @IsString()
  code: string;
}
