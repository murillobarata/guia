import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    create(category: Category) {
        return this.categoryRepository.save(category);
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoryRepository.findOne(id);
    } 

    async findOneWithPosts(id: number): Promise<Category> {
        return await this.categoryRepository.findOne(id, {relations: ["posts"]});
    }

    async findOneWithServices(id: number): Promise<Category> {
        return await this.categoryRepository.findOne(id, { relations: ["guideServices"]});
    }

    async update(id: number, categoryDto: UpdateCategoryDto) {
        let categoryToUpdate = await this.categoryRepository.findOne(id);
        categoryToUpdate.name = categoryDto.name;
        categoryToUpdate.updatedAt = new Date();

        await this.categoryRepository.save(categoryToUpdate);
        return categoryToUpdate;
    }

    async remove(id: number) {
        let categoryToRemove = await this.categoryRepository.findOne(id);
        return await this.categoryRepository.remove(categoryToRemove);
    }
}
