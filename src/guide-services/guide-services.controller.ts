import { Controller, Get, Param, Put, Delete, Body, Post } from '@nestjs/common';
import { GuideServicesService } from './guide-services.service';
import { GuideService } from './guide-service.entity';
import { CreateGuideServiceDto } from './dto/create-guide-service.dto';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('guide-services')
export class GuideServicesController {

    constructor(private guideServicesService: GuideServicesService, private usersService: UsersService,
        private categoriesService: CategoriesService) {}

    findAll(): Promise<GuideService[]> {
        return this.guideServicesService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<GuideService> {
        return this.guideServicesService.findOne(params.id);
    }

    @Post()
    async create(@Body() createGuideServiceDto: CreateGuideServiceDto) {
        var newGuideService = new GuideService();
        newGuideService.title = createGuideServiceDto.title;
        newGuideService.description = createGuideServiceDto.description;
        newGuideService.address = createGuideServiceDto.address;
        newGuideService.author = await this.usersService.findOne(createGuideServiceDto.user_id);
        newGuideService.categories = [];
        createGuideServiceDto.categories_id.forEach(async (cat_id: number) => {
            newGuideService.categories.push(await this.categoriesService.findOne(cat_id));
        });

        newGuideService.createdAt = new Date();
        newGuideService.updatedAt = new Date();

        // var author = await this.usersService.findOne(createGuideServiceDto.user_id);
        // post.author = author;

        // post.categories = new Array<Category>();

        // const promises = createGuideServiceDto.categories.map(
        //     async (cat_id: number) => {
        //         var category = await this.categoryService.findOne(cat_id);
        //         post.categories.push(category);
        //     }
        // );

        // await Promise.all(promises);

        // this.postService.create(post);
        // return post;

    }

    @Put(':id')
    edit(@Param('id') id: number, @Body() updateGuideServiceDto: UpdateGuideServiceDto) {
        return this.guideServicesService.update(id, updateGuideServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.guideServicesService.remove(id);
    }
}
