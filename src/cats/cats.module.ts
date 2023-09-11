import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [ConfigModule.forFeature(databaseConfig)]
})
export class CatsModule {}
