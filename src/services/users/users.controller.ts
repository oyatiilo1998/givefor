// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailService } from 'src/pkg/email/email.service';
import { SendgridService } from 'src/pkg/sendgrid/sendgrid.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly sendgridService: SendgridService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    const resultUserCreate = await this.usersService.create(createUserDto);
    console.log(resultUserCreate);
    const code = Math.floor(100000 + Math.random() * 900000);

    const resultCodeCreate = await this.usersService.createCode({
      email: createUserDto.email,
      code: code.toString(),
    });

    const resultSendCode = await this.emailService.sendCode({
      toEmail: createUserDto.email,
      name: createUserDto.name,
      code: code.toString(),
    });

    return;
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: UserEntity, isArray: true })
  // async findAll() {
  //   const users = await this.usersService.findAll();
  //   return users.map((user) => new UserEntity(user));
  // }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: UserEntity })
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return new UserEntity(await this.usersService.findOne(id));
  // }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiCreatedResponse({ type: UserEntity })
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return new UserEntity(
  //     await this.usersService.update(id, null, updateUserDto),
  //   );
  // }

  @Patch('password/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(
      await this.usersService.update(id, null, updateUserDto),
    );
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: UserEntity })
  // async remove(@Param('id', ParseIntPipe) id: number) {
  //   return new UserEntity(await this.usersService.remove(id));
  // }
}
