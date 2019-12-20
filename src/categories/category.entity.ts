import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { PostEntity } from "./../posts/post.entity";
import { GuideService } from "./../guide-services/guide-service.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn({name: "category_id"})
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    icon: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToMany(type => PostEntity, post => post.categories)
    posts: PostEntity[];

    @ManyToMany(type => GuideService, guideService => guideService.categories)
    guideServices: GuideService[];
}