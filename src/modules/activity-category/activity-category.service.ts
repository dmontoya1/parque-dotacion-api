import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityCategoryDto } from './dto/create-activity-category.dto';
import { UpdateActivityCategoryDto } from './dto/update-activity-category.dto';

@Injectable()
export class ActivityCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.activityCategory.findMany();
    }

    findOne(id: number) {
        return this.prisma.activityCategory.findUnique({ where: { id } });
    }

    create(dto: CreateActivityCategoryDto) {
        return this.prisma.activityCategory.create({ data: dto });
    }

    update(id: number, dto: UpdateActivityCategoryDto) {
        return this.prisma.activityCategory.update({
            where: { id },
            data: dto,
        });
    }

    delete(id: number) {
        return this.prisma.activityCategory.delete({ where: { id } });
    }
}
