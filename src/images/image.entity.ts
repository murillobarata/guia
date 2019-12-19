import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { PostEntity } from "../posts/post.entity";
import { GuideService } from "./../guide-services/guide-service.entity";

@Entity({name: "image"})
export class ImageEntity {

    @PrimaryGeneratedColumn({name: "image_id"})
    id: number;

    @ManyToOne(type => GuideService, guideService => guideService.images)
    guideService: GuideService;

    @Column()
    url: string;

    @Column()
    base64: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}