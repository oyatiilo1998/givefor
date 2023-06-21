//src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity, VerifyCodeEntity } from './entity/auth.entity';
import { LoginDto, ForgotPasswordDto, ResendCodeDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { EmailService } from 'src/pkg/email/email.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('forgot-password')
  @ApiOkResponse({ type: AuthEntity })
  forgotPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('resend-code')
  @ApiOkResponse()
  async resnsedCode(@Body() { email }: ResendCodeDto) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const resultCodeCreate = await this.usersService.createCode({
      email: email,
      code: code.toString(),
    });

    const user = await this.usersService.findByEmail(email);

    const resultSendCode = await this.emailService.sendCode({
      toEmail: email,
      name: user.name,
      code: code.toString(),
    });
    console.log(resultSendCode, 'send code result');
  }

  @Post('verify')
  @ApiOkResponse({ type: VerifyCodeEntity })
  async verify(@Body() verifyCodeDto: VerifyCodeDto) {
    const result = await this.usersService.verifyCode(verifyCodeDto);
    console.log(result);
    if (result.length > 0) {
      const updateUserDto: UpdateUserDto = new UpdateUserDto();
      updateUserDto.confirmed = true;

      await this.usersService.update(null, result[0].email, updateUserDto);
      const user = await this.usersService.findByEmail(result[0].email);

      const expiresAtAccessToken = new Date();
      expiresAtAccessToken.setTime(
        expiresAtAccessToken.getTime() + 24 * 60 * 60 * 1000,
      );

      const expiresAtReshreshToken = new Date();
      expiresAtReshreshToken.setTime(
        expiresAtReshreshToken.getTime() + 30 * 24 * 60 * 60 * 1000,
      );

      return {
        accessToken: this.jwtService.sign({
          user_id: user.id,
          expiresAt: expiresAtAccessToken,
        }),
        refreshToken: this.jwtService.sign({
          user_id: user.id,
          expiresAt: expiresAtReshreshToken,
        }),
      };
    } else {
      return {
        error: 'passcode expired or user not registered yet',
      };
    }
  }
}
