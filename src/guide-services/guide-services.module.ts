import { Module, forwardRef } from '@nestjs/common';
import { GuideServicesService } from './guide-services.service';
import { GuideService } from './guide-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideServicesController } from './guide-services.controller';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ImagesModule } from 'src/images/images.module';

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
