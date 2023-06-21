//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class ResendCodeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
