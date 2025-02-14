import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un token' })
  @IsString()
  token: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña' })
  @IsString()
  oldPassword: string;
}
