import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./../users/user.entity";
import { PostEntity } from "./../posts/post.entity";
import { Category } from "./../categories/category.entity";

export const dbconfig: TypeOrmModuleOptions = {
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
}