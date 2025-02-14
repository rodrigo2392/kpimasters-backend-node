import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';

export class RegisterAuthDto {
  @IsNotEmpty({ message: 'Debes ingresar un email' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña' })
  @IsString()
  password: string;

  @IsNotEmpty()
  user: CreateUserDto;
}
