//src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity, VerifyCodeEntity } from './entity/auth.entity';
import { LoginDto, ForgotPasswordDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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

  @Post('verify')
  @ApiOkResponse({ type: VerifyCodeEntity })
  async verify(@Body() verifyCodeDto: VerifyCodeDto) {
    const result = await this.usersService.verifyCode(verifyCodeDto);
    if (result.length > 0) {
      let updateUserDto: UpdateUserDto;
      updateUserDto.confirmed = true;
      await this.usersService.update(null, result[0].email, updateUserDto);
      const user = await this.usersService.findByEmail(result[0].email);
      return { accessToken: this.jwtService.sign({ user_id: user.id }) };
    }
  }
}
