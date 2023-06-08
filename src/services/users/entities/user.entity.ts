// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from '@nestjs/class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  confirmed: boolean;

  @Exclude()
  password: string;
}
