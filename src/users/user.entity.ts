import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEntity } from "./../posts/post.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({name: "user_id"})
    id: number;

    @Column({ length: 500})
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToMany(type => PostEntity, post => post.author)
    posts: PostEntity[];

}