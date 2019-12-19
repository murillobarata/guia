import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "../users/user.entity";
import { Category } from "../categories/category.entity";
import { ImageEntity } from "./../images/image.entity";

@Entity({name: "service"})
export class GuideService {

    @PrimaryGeneratedColumn({name: "service_id"})
    id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column()
    eventDate: Date;

    @Column()
    phone: string;

    @Column()
    address: string;

    @ManyToOne(type => User, user => user.guideServices)
    author: User;

    @ManyToMany(type => Category, category => category.guideServices)
    @JoinTable()
    categories: Category[];

    @OneToMany(type => ImageEntity, image => image.guideService)
    images: ImageEntity[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
    
}