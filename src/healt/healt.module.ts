import { Module } from '@nestjs/common';
import { HealtController } from './healt.controller';
import { HealtService } from './healt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from './healt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Health])],
  controllers: [HealtController],
  providers: [HealtService]
})
export class HealtModule {}
