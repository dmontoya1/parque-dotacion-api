import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityCategoryService } from './modules/activity-category/activity-category.service';
import { ActivityCategoryModule } from './modules/activity-category/activity-category.module';

@Module({
  imports: [PrismaModule, ActivityCategoryModule],
  controllers: [AppController],
  providers: [AppService, ActivityCategoryService],
})
export class AppModule {}
