import { Controller, Get, Param, Put, Delete, Body, Post } from '@nestjs/common';
import { GuideServicesService } from './guide-services.service';
import { GuideService } from './../guide-services/guide-service.entity';
import { CreateGuideServiceDto } from './dto/create-guide-service.dto';
import { UsersService } from './../users/users.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/category.entity';
import { UpdateGuideServiceDto } from './dto/update-guide-service.dto';
import { ImageEntity } from 'src/images/image.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { decodeBase64Image, fs, pathUrl } from 'src/utils/utils';
import { join } from 'path';

@Controller('guide-services')
export class GuideServicesController {

    constructor(private guideServicesService: GuideServicesService, private usersService: UsersService,
        private categoriesService: CategoriesService) {}

    @Get()
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
        newGuideService.phone = createGuideServiceDto.phone;
        
        newGuideService.author = await this.usersService.findOne(createGuideServiceDto.user_id);

        newGuideService.createdAt = new Date();
        newGuideService.updatedAt = new Date();

        newGuideService.categories = new Array<Category>();

        const promises = createGuideServiceDto.categories_id.map(
            async (cat_id: number) => {
                var category = await this.categoriesService.findOne(cat_id);
                newGuideService.categories.push(category);
            }
        );

        await Promise.all(promises);
        
        // TODO: IMAGES
        // newGuideService.images = new Array<ImageEntity>();
        // const imagesPromise = createGuideServiceDto.images.map(
        //     async(imageB64: string) => {
        //         var newImage = decodeBase64Image(imageB64);
        //         (await fs).writeFile(join(process.cwd() + '/static/images/service/')+newGuideService.updatedAt.getTime()+'.png', newImage.data, (err) => console.log(err));

        //         var img = new ImageEntity();
        //         img.createdAt = newGuideService.updatedAt;
        //         img.updatedAt = newGuideService.updatedAt;
        //         img.url = pathUrl + '/images/category/'+newGuideService.updatedAt.getTime()+'.png';

        //         newGuideService.images.push(img);
        //     }
        // )

        this.guideServicesService.create(newGuideService);
        return newGuideService;
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() updateGuideServiceDto: UpdateGuideServiceDto) {
        var guideServiceToUpdate = await this.guideServicesService.findOne(id);
        guideServiceToUpdate.address = updateGuideServiceDto.address;
        guideServiceToUpdate.description = updateGuideServiceDto.description;
        guideServiceToUpdate.eventDate = new Date(updateGuideServiceDto.eventDate);
        guideServiceToUpdate.phone = updateGuideServiceDto.phone;
        guideServiceToUpdate.title = updateGuideServiceDto.title;
        guideServiceToUpdate.updatedAt = new Date();

        guideServiceToUpdate.categories = new Array<Category>();

        const promises = updateGuideServiceDto.categories_id.map(
            async (cat_id: number) => {
                var category = await this.categoriesService.findOne(cat_id);
                guideServiceToUpdate.categories.push(category);
            }
        );

        await Promise.all(promises);

        return this.guideServicesService.update(id, updateGuideServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.guideServicesService.remove(id);
    }
}
