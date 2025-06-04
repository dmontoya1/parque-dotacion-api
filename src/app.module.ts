import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityCategoryService } from './activity-category/activity-category.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, ActivityCategoryService],
})
export class AppModule {}
