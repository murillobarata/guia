import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    create(post: PostEntity) {
        return this.postRepository.save(post);
    }

    findAll(): Promise<PostEntity[]> {
        return this.postRepository.find({ relations: ["author"]});
    }

    findOne(id: number): Promise<PostEntity> {
        return this.postRepository.findOne(id, {relations: ["author", "categories"]});
    }

    async update(id: number, postDto: UpdatePostDto) {
        let postToUpdate = await this.postRepository.findOne(id);
        postToUpdate.title = postDto.title;
        postToUpdate.content = postDto.content;
        postToUpdate.createdAt = new Date();

        await this.postRepository.save(postToUpdate);
        return postToUpdate;
    }

    async remove(id: number) {
        let postToRemove = await this.postRepository.findOne(id);
        return await this.postRepository.remove(postToRemove);
    }
}
