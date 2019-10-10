import { UseGuards } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';

import { PostsService } from "./posts.service";
import { PostsGuard } from "./posts.guard";

const pubSub = new PubSub();

@Resolver('Post')
export class PostsResolvers {
    constructor (private readonly postsService: PostsService) {}

    @Query()
    @UseGuards(PostsGuard)
    async getPosts() {
        return await this.postsService.findAll();
    }

}