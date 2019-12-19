import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./../users/user.entity";
import { PostEntity } from "./../posts/post.entity";
import { Category } from "./../categories/category.entity";
import { GuideService } from "./../guide-services/guide-service.entity";
import { ImageEntity } from "./../images/image.entity";

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
        Category,
        GuideService,
        ImageEntity
    ],
    synchronize: true
}