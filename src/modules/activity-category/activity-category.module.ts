import { Module } from '@nestjs/common';
import { ActivityCategoryService } from './activity-category.service';
import { ActivityCategoryController } from './activity-category.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityCategoryController],
  providers: [ActivityCategoryService],
})
export class ActivityCategoryModule {}