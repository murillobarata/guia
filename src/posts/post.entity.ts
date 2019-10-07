import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./../users/user.entity";

@Entity({name: "post"})
export class PostEntity {

    @PrimaryGeneratedColumn({name: "post_id"})
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts)
    author: User;
}