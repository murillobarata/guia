import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuideService } from './guide-service.entity';
import { Repository } from 'typeorm';
import { UpdateGuideServiceDto } from './dto/update-guide-service.dto';

@Injectable()
export class GuideServicesService {
    constructor(
        @InjectRepository(GuideService)
        private readonly guideServiceRepository: Repository<GuideService>,
    ) {}

    create(guideService: GuideService) {
        return this.guideServiceRepository.save(guideService);
    }

    findAll(): Promise<GuideService[]> {
        return this.guideServiceRepository.find({relations: ['author', 'categories', 'images']});
    }

    findOne(id: number): Promise<GuideService> {
        return this.guideServiceRepository.findOne(id, {relations: ['author', 'categories', 'images']});
    }

    async update(id: number, guideServiceDto: UpdateGuideServiceDto) {
        let guideServiceToUpdate = await this.guideServiceRepository.findOne(id);
        guideServiceToUpdate.title = guideServiceDto.title;
        guideServiceToUpdate.address = guideServiceDto.address;
        guideServiceToUpdate.description = guideServiceDto.description;
        // guideServiceToUpdate.images = guideServiceDto.images;
        guideServiceToUpdate.phone = guideServiceDto.phone;
        guideServiceToUpdate.eventDate = new Date(guideServiceDto.eventDate);
        guideServiceToUpdate.updatedAt = new Date();

        await this.guideServiceRepository.save(guideServiceToUpdate);
        return guideServiceToUpdate;
    }

    async remove(id: number) {
        let guideServiceToRemove = await this.guideServiceRepository.findOne(id);
        return await this.guideServiceRepository.remove(guideServiceToRemove);
    }
}
