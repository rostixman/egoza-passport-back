import { Module } from '@nestjs/common';
import { AuthControllerV1 } from './auth.controller.v1';
import { AuthControllerV2 } from './auth.controller.v2';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // доступен во всех модулях
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // время жизни куки 1 день
    }),
  ],
  controllers: [AuthControllerV2, AuthControllerV1],
  providers: [AuthService, PasswordService, CookieService],
})
export class AuthModule {}
