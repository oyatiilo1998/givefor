import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailService } from 'src/pkg/email/email.service';
import { EmailModule } from 'src/pkg/email/email.module';
import { SendgridService } from 'src/pkg/sendgrid/sendgrid.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SendgridService],
  imports: [PrismaModule, EmailModule],
  exports: [UsersService],
})
export class UsersModule {}
