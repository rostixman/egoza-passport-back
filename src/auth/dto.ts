import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegistrationBodyDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class LoginBodyDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwer1234' })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class SessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
