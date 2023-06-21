// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { VerifyCodeDto } from '../auth/dto/verify-code.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.confirmed = false;
    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, email: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    console.log(updateUserDto);

    if (email) {
      return this.prisma.user.update({
        where: { email },
        data: updateUserDto,
      });
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  createCode(createCodeBody: any) {
    return this.prisma.registrationCode.create({ data: createCodeBody });
  }

  verifyCode(verifyCodeDto: VerifyCodeDto) {
    const now = new Date();
    console.log(now);
    return this.prisma.registrationCode.findMany({
      where: {
        code: verifyCodeDto.code,
        email: verifyCodeDto.email,
        expires_at: { gt: now },
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
