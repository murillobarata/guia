import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { UsersModule } from './../users/users.module';
import { CategoriesModule } from './../categories/categories.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        UsersModule,
        forwardRef(() => CategoriesModule)
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
