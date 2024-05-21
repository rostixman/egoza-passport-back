import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto, RegistrationBodyDto, SessionDto } from './dto';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session.decorator';

@ApiTags('auth')
@Controller({ path: 'auth', version: [VERSION_NEUTRAL, '1'] })
export class AuthControllerV1 {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}
  @Post('registration')
  @ApiCreatedResponse()
  async registration(
    @Body() body: RegistrationBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.registration(
      body.email,
      body.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('login')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(
      body.email,
      body.password,
    );
    this.cookieService.setToken(res, accessToken);
  }

  @Post('logout')
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({
    type: SessionDto,
  })
  @UseGuards(AuthGuard)
  session(@SessionInfo() session: SessionDto) {
    return session;
  }
}
