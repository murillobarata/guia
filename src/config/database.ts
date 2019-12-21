import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./../users/user.entity";
import { PostEntity } from "./../posts/post.entity";
import { Category } from "./../categories/category.entity";
import { GuideService } from "./../guide-services/guide-service.entity";
import { ImageEntity } from "./../images/image.entity";

// export const dbconfig: TypeOrmModuleOptions = {
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "guia",
//     entities: [
//         User, 
//         PostEntity,
//         Category,
//         GuideService,
//         ImageEntity
//     ],
//     synchronize: true
// }

export const dbconfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "mysql669.umbler.com",
    port: 41890,
    username: "mbarata",
    password: "tdostdompgsc",
    database: "guiasertao",
    entities: [
        User, 
        PostEntity,
        Category,
        GuideService,
        ImageEntity
    ],
    synchronize: true
}