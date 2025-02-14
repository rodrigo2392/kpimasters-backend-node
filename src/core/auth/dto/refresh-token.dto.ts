import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'Debes ingresar un código' })
  @IsString()
  refreshToken: string;
}
