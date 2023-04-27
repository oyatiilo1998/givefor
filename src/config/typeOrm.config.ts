import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('database.host'),
      port: Number(configService.get('database.port')) || 5434,
      username: configService.get('database.user'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      autoLoadEntities: true,
      synchronize: true,
      migrations: [__dirname + '/../database/migrations/**/*.{js,ts}'],
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    };
  },
};
