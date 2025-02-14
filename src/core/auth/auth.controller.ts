import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ResendCodeAuthDto } from './dto/resend-code-auth.dto';
import { ChangePasswordAuthDto } from './dto/reset-password.dto';
import { ConfirmPasswordCodeAuthDto } from './dto/confirm-password-code.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      const data = await this.authService.login(loginAuthDto);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuario o contraseña incorrecto',
          message: 'Usuario o contraseña incorrecto',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post('refreshtoken')
  async refreshToken(@Body() refreshToken: RefreshTokenDTO) {
    try {
      const data = await this.authService.refreshToken(refreshToken);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuario o contraseña incorrecto',
          message: 'Usuario o contraseña incorrecto',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('verify')
  verifyConfirmationCode(@Body() verifyAuthDto: VerifyAuthDto) {
    return this.authService.verifyConfirmationCode(verifyAuthDto);
  }

  @Post('resend-code')
  resendConfirmationCode(@Body() resendCodeAuthDto: ResendCodeAuthDto) {
    return this.authService.resendConfirmationCode(resendCodeAuthDto);
  }

  @Post('sendcodepassword')
  sendPasswordCode(@Body() resendCodeAuthDto: ResendCodeAuthDto) {
    return this.authService.forgotPasswordCode(resendCodeAuthDto);
  }

  @Post('verifycodepassword')
  verifyPasswordCode(
    @Body() confirmPasswordCodeAuthDto: ConfirmPasswordCodeAuthDto,
  ) {
    return this.authService.confirmForgotPasswordCode(
      confirmPasswordCodeAuthDto,
    );
  }

  @Post('changepassword')
  changePassword(@Body() changePasswordAuthDto: ChangePasswordAuthDto) {
    return this.authService.changePassword(changePasswordAuthDto);
  }

  @Post('userexists')
  validateUserExists(@Body() loginDto: LoginAuthDto) {
    return this.authService.userExists(loginDto.email);
  }
}
