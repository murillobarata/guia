import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEntity } from "./../posts/post.entity";
import { GuideService } from "./../guide-services/guide-service.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({name: "user_id"})
    id: number;

    @Column({ length: 500})
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    profilePicture: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToMany(type => PostEntity, post => post.author)
    posts: PostEntity[];

    @OneToMany(type => GuideService, guideService => guideService.author)
    guideServices: GuideService[];

}