import { Module, forwardRef } from '@nestjs/common';
import { GuideServicesService } from './guide-services.service';
import { GuideService } from './../guide-services/guide-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideServicesController } from './guide-services.controller';
import { UsersModule } from './../users/users.module';
import { CategoriesModule } from './../categories/categories.module';
import { ImagesModule } from './../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuideService]),
    UsersModule,
    ImagesModule,
    forwardRef(() => CategoriesModule)
  ],
  controllers: [GuideServicesController],
  providers: [GuideServicesService]
})
export class GuideServicesModule {}
