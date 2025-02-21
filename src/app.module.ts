import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { DemosModule } from './core/demos/demos.module';
import { CompaniesModule } from './core/companies/companies.module';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from './core/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL ?? '', {
      dbName: process.env.MONGO_DB ?? '',
      user: process.env.MONG_USER ?? '',
      pass: process.env.MONG_PASS ?? '',
    }),
    DemosModule,
    CompaniesModule,
    UsersModule,
    AuthModule,
    CognitoAuthModule.register({
      jwtVerifier: {
        userPoolId: process.env.COGNITO_POOOL_ID ?? '',
        clientId: process.env.COGNITO_CLIENT_ID ?? '',
        tokenUse: 'id',
      },
    }),
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
