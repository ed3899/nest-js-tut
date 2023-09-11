import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
