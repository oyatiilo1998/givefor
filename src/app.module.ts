import { Module } from '@nestjs/common';
import { PostModule } from './services/post/post.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './services/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './pkg/email/email.module';
import { EmailController } from './pkg/email/email.controller';

@Module({
  imports: [
    PrismaModule,
    PostModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
