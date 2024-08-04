import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller({ path: 'auth', version: [VERSION_NEUTRAL, '2'] })
export class AuthControllerV2 {
  @Get('session')
  @ApiOperation({ summary: 'summary goes here', deprecated: false })
  sessionV2() {
    return 'session from v2';
  }
}
