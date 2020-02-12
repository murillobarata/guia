import { Controller, Get, Param, Put, Delete, Body, Post, UseGuards } from '@nestjs/common';
import { GuideServicesService } from './guide-services.service';
import { GuideService } from './../guide-services/guide-service.entity';
import { CreateGuideServiceDto } from './dto/create-guide-service.dto';
import { UsersService } from './../users/users.service';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/category.entity';
import { UpdateGuideServiceDto } from './dto/update-guide-service.dto';
import { ImageEntity } from './../images/image.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { decodeBase64Image, fs, pathUrl } from './../utils/utils';
import { join } from 'path';
import { ImagesService } from './../images/images.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('guide-services')
export class GuideServicesController {

    constructor(private guideServicesService: GuideServicesService, private usersService: UsersService,
        private categoriesService: CategoriesService, private imagesService: ImagesService) {}

    @Get()
    findAll(): Promise<GuideService[]> {
        return this.guideServicesService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<GuideService> {
        return this.guideServicesService.findOne(params.id);
    }

    @UseGuards(AuthGuard('jwt'))
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

        const categoriesPromises = createGuideServiceDto.categories_id.map(
            async (cat_id: number) => {
                var category = await this.categoriesService.findOne(cat_id);
                if (category != null) {
                    newGuideService.categories.push(category);
                }
            }
        );

        await Promise.all(categoriesPromises);

        if (newGuideService.categories.length > 0) {
            return this.guideServicesService.create(newGuideService).then(async (savedGuideService: GuideService) => {
                
                savedGuideService.images = new Array<ImageEntity>();
                const imagesPromise = createGuideServiceDto.images.map(
                    async(imageB64: string) => {
                        var newImage = decodeBase64Image(imageB64);
                        var auxDt = new Date();
                        var imgName = savedGuideService.title.replace(/[^A-Z0-9]+/ig, "_") + auxDt.getTime() + Math.floor(Math.random() * 100001);

                        (await fs).writeFile(join(process.cwd() + '/static/images/service/')+imgName+'.png', newImage.data, (err) => console.log(err));
        
                        var img = new ImageEntity();
                        img.createdAt = savedGuideService.updatedAt;
                        img.updatedAt = savedGuideService.updatedAt;
                        img.url = pathUrl + '/images/service/'+imgName+'.png';
                        
                        await this.imagesService.create(img);

                        savedGuideService.images.push(img);
                    }
                );
                
                await Promise.all(imagesPromise);

                await this.guideServicesService.create(savedGuideService);

                return savedGuideService;
            });
        } else {
            return { 
                'statusCode': 500,
                'message': 'Categoria inválida.'
            };
        }
    }

    @UseGuards(AuthGuard('jwt'))
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

        return this.guideServicesService.create(guideServiceToUpdate);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.guideServicesService.remove(id);
    }
}
