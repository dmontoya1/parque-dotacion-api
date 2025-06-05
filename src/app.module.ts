import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER } from '@nestjs/core';

import appConfig from './config/app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Prisma
import { PrismaModule } from './prisma/prisma.module';
import { ActivityCategoryModule } from './modules/activity-category/activity-category.module';

// Common
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-exception.filter';


// Modules
/*import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ParksModule } from './modules/parks/parks.module';
import { ActivityCategoriesModule } from './modules/activity-categories/activity-categories.module';
import { ScenariosModule } from './modules/scenarios/scenarios.module';
import { PartitionsModule } from './modules/partitions/partitions.module';
import { PartitionSegmentsModule } from './modules/partition-segments/partition-segments.module';
import { ScheduleEndowmentsModule } from './modules/schedule-endowments/schedule-endowments.module';
import { AgendasModule } from './modules/agendas/agendas.module';*/

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),

    PrismaModule,

    // Throttling
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>('app.throttle.ttl') || 60,
            limit: configService.get<number>('app.throttle.limit') || 10,
          },
        ],
      }),
    }),

    // Cache
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes
    }),

    // Feature Modules
    /*AuthModule,
    UsersModule,
    ParksModule,
    ActivityCategoriesModule,
    ScenariosModule,
    PartitionsModule,
    PartitionSegmentsModule,
    ScheduleEndowmentsModule,
    AgendasModule,*/
  ActivityCategoryModule,
  ],
  controllers: [AppController, ],
  providers: [
  AppService,
  {
    provide: APP_FILTER,
    useClass: PrismaClientExceptionFilter,
  },
  ],
})
export class AppModule {}
