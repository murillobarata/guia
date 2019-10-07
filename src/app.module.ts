import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { LoggerMiddleware } from './middleware/LoggerMiddleware';

import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/post.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "guia",
      entities: [
        User, 
        PostEntity,
        Category
      ],
      synchronize: true
  }),
    UsersModule,
    PostsModule,
    CategoriesModule
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
