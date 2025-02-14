import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ResendConfirmationCodeCommand,
  ConfirmSignUpCommand,
  ChangePasswordCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ListUsersCommand,
  UserType,
} from '@aws-sdk/client-cognito-identity-provider';
import { RegisterAuthDto } from './dto/register.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ResendCodeAuthDto } from './dto/resend-code-auth.dto';
import { ChangePasswordAuthDto } from './dto/reset-password.dto';
import { ConfirmPasswordCodeAuthDto } from './dto/confirm-password-code.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
  client: CognitoIdentityProviderClient;
  clientId: string;

  constructor(private readonly userService: UsersService) {
    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
    this.clientId = process.env.COGNITO_CLIENT_ID ?? '';
  }
  @HttpCode(HttpStatus.OK)
  async login(loginDTO: LoginAuthDto) {
    const { email, password } = loginDTO;
    const params: InitiateAuthCommand = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });
    return this.client.send(params);
  }
  async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
    const { refreshToken } = refreshTokenDTO;
    const params: InitiateAuthCommand = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: 'REFRESH_TOKEN',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });
    return this.client.send(params);
  }

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { email, password } = registerAuthDto;
      const params: SignUpCommand = new SignUpCommand({
        ClientId: this.clientId,
        Username: email,
        Password: password,
      });
      const data = await this.client.send(params);
      if (data.UserSub) {
        const cognito_id = data.UserSub ?? '';
        const newUSer = registerAuthDto.user;
        newUSer.cognito_id = cognito_id;
        const user = await this.userService.create({
          ...newUSer,
          email,
        });
        return user;
      } else {
        throw new Error('No fue posible crear el usuario');
      }
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ha ocurrido un error: ' + err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  async forgotPasswordCode(resendCodeAuthDto: ResendCodeAuthDto) {
    const { email } = resendCodeAuthDto;
    const params = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: email,
    });
    const data = this.client.send(params);
    return data;
  }

  async confirmForgotPasswordCode(
    confirmPasswordCodeAuthDto: ConfirmPasswordCodeAuthDto,
  ) {
    const { email, password, code } = confirmPasswordCodeAuthDto;
    const params = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: email,
      Password: password,
    });
    const data = this.client.send(params);
    return data;
  }

  async changePassword(changePasswordAuthDto: ChangePasswordAuthDto) {
    const { password, token, oldPassword } = changePasswordAuthDto;
    const params = new ChangePasswordCommand({
      AccessToken: token,
      ProposedPassword: password,
      PreviousPassword: oldPassword,
    });
    const data = this.client.send(params);
    return data;
  }

  async verifyConfirmationCode(verifyAuthDto: VerifyAuthDto) {
    const { email, code } = verifyAuthDto;
    const params = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: email,
    });
    const data = this.client.send(params);
    return data;
  }

  async resendConfirmationCode(resendCodeAuthDto: ResendCodeAuthDto) {
    const { email } = resendCodeAuthDto;
    const params: ResendConfirmationCodeCommand =
      new ResendConfirmationCodeCommand({
        ClientId: this.clientId,
        Username: email,
      });
    const data = this.client.send(params);
    return data;
  }

  async userExists(email: string) {
    const params = new ListUsersCommand({
      UserPoolId: process.env.COGNITO_POOOL_ID,
    });
    const data = await this.client.send(params);
    let found: UserType | null = null;
    if (data) {
      data?.Users?.map((el) => {
        el?.Attributes?.map((values) => {
          if (values.Name === 'email') {
            if (values.Value === email) {
              found = el;
            }
          }
        });
      });
    }

    return found;
  }
}
