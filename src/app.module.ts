import { Module } from '@nestjs/common';
import { PostModule } from './services/post/post.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './services/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    PostModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
