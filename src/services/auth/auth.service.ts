//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { EmailService } from 'src/pkg/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private email: EmailService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findMany({
      where: { email: email, confirmed: true },
    });

    // If no user is found, throw an error
    if (user.length == 0) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const expiresAtAccessToken = new Date();
    expiresAtAccessToken.setTime(
      expiresAtAccessToken.getTime() + 29 * 60 * 60 * 1000,
    );

    const expiresAtReshreshToken = new Date();
    expiresAtReshreshToken.setTime(
      expiresAtReshreshToken.getTime() +
        30 * 24 * 60 * 60 * 1000 +
        expiresAtReshreshToken.getTime() +
        5 * 60 * 60 * 1000,
    );

    // Step 3: Generate a JWT token containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({
        user_id: user[0].id,
        expiresAt: expiresAtAccessToken,
      }),
      refreshToken: this.jwtService.sign({
        user_id: user[0].id,
        expiresAt: expiresAtReshreshToken,
      }),
    };
  }

  async forgotPassword(email: string) {
    const password = generatePassword.generate({
      length: 10,
      numbers: true,
    });

    this.email.send({ toEmail: email, password: password });

    const userDto: UpdateUserDto = new UpdateUserDto();
    userDto.password = password;

    this.usersService.update(null, email, userDto);
  }
}
