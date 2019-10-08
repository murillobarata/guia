import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostEntity } from './post.entity';
import { UsersService } from './../users/users.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from 'src/categories/category.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService,
        private userService: UsersService,
        private categoryService: CategoriesService) {}

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

        var author = await this.userService.findOne(createPostDto.user_id);
        post.author = author;

        post.categories = new Array<Category>();

        const promises = createPostDto.categories.map(
            async (cat_id: number) => {
                var category = await this.categoryService.findOne(cat_id);
                post.categories.push(category);
            }
        );

        await Promise.all(promises);

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
