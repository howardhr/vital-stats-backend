import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealtModule } from './healt/healt.module';
import { Health } from './healt/healt.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_ADDON_HOST'),
        port: +configService.get('MYSQL_ADDON_PORT'),
        username: configService.get('MYSQL_ADDON_USER'),
        password: configService.get('MYSQL_ADDON_PASSWORD'),
        database: configService.get('MYSQL_ADDON_DB'),
        url: configService.get('MYSQL_ADDON_URI'),
        entities: [Health],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HealtModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
