import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { PostEntity } from "./../posts/post.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn({name: "category_id"})
    id: number;

    @Column()
    name: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToMany(type => PostEntity, post => post.categories)
    posts: PostEntity[];
}