import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageEntityRepository: Repository<ImageEntity>,
    ) {}

    create(imageEntity: ImageEntity) {
        return this.imageEntityRepository.save(imageEntity);
    }
}
