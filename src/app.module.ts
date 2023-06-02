import { Module } from '@nestjs/common';
import { PostModule } from './services/post/post.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { UsersModule } from './services/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './pkg/email/email.module';
import { EmailController } from './pkg/email/email.controller';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    PostModule,
    UsersModule,
    EmailModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
