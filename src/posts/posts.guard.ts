import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';


@Injectable()
export class PostsGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return true;
    }
} 