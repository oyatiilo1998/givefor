import { Module } from '@nestjs/common';
import { PrismaModule } from './services/prisma/prisma.module';
import { UsersModule } from './services/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './pkg/email/email.controller';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [],
})
export class AppModule {}
