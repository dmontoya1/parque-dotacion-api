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

    findOne(ac_id: number) {
        return this.prisma.activityCategory.findUnique({ where: { ac_id } });
    }

    create(dto: CreateActivityCategoryDto) {
        return this.prisma.activityCategory.create({ data: dto });
    }

    update(ac_id: number, dto: UpdateActivityCategoryDto) {
        return this.prisma.activityCategory.update({
            where: { ac_id },
            data: dto,
        });
    }

    delete(ac_id: number) {
        return this.prisma.activityCategory.delete({ where: { ac_id } });
    }
}
