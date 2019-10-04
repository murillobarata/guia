import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';
import { User } from './users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "guia",
      entities: [User],
      synchronize: true
  }),
    UsersModule
  ],
})
export class AppModule implements NestModule {

  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}
