import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { UsersModule } from './../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        UsersModule,    
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
