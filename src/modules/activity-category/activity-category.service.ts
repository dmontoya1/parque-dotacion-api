import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityCategoryDto } from './dto/create-activity-category.dto';
import { UpdateActivityCategoryDto } from './dto/update-activity-category.dto';
import { ActivityCategory } from './interface/activity-category.interface';

@Injectable()
export class ActivityCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<ActivityCategory[]> {
        return this.prisma.activityCategory.findMany();
    }

    findOne(ac_id: number): Promise<ActivityCategory | null> {
        return this.prisma.activityCategory.findUnique({ where: { ac_id } });
    }

    create(dto: CreateActivityCategoryDto): Promise<ActivityCategory> {
        return this.prisma.activityCategory.create({
            data: {
                ac_name: dto.name,
                ac_description: dto.description,
                ac_priority_level: dto.priorityLevel,
            },
        });
    }

    update(ac_id: number, dto: UpdateActivityCategoryDto): Promise<ActivityCategory> {
        return this.prisma.activityCategory.update({
            where: { ac_id },
            data: {
                ac_name: dto.name,
                ac_description: dto.description,
                ac_priority_level: dto.priorityLevel,
            },
        });
    }

    delete(ac_id: number): Promise<ActivityCategory> {
        return this.prisma.activityCategory.delete({ where: { ac_id } });
    }
}
