import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un email' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña' })
  @IsString()
  password: string;
}
