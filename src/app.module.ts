import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection } from 'typeorm';

import { LoggerMiddleware } from './middleware/LoggerMiddleware';

import { dbconfig } from './config/database';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbconfig),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {

  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users', 'posts');
  }
}
