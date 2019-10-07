import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';
import { UpdatePostDto } from './dto/updatePostDto';
import { PostEntity } from './post.entity';
import { UsersService } from './../users/users.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService,
        private userService: UsersService) {}

    @Get()
    findAll(): Promise<PostEntity[]> {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<PostEntity> {
        return this.postService.findOne(params.id);
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        var post = new PostEntity();
        post.title = createPostDto.title;
        post.content = createPostDto.content;
        post.createdAt = new Date();
        post.updatedAt = new Date();
        console.log(createPostDto.user_id);
        var author = await this.userService.findOne(createPostDto.user_id);
        console.log(author);
        post.author = author;

        this.postService.create(post);
        return post;
    }

    @Put(':id')
    edit(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.postService.remove(id);
    }
}
