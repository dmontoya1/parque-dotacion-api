import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScScenarioDto } from './dto/create-sc-scenario.dto';
import { UpdateScScenarioDto } from './dto/update-sc-scenario.dto';
import { ScScenario } from './interface/sc-scenario.interface';

@Injectable()
export class ScScenarioService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<ScScenario[]> {
    return this.prisma.scenario.findMany();
  }

  findOne(sc_id: number): Promise<ScScenario | null> {
    return this.prisma.scenario.findUnique({ where: { sc_id } });
  }

  async create(dto: CreateScScenarioDto): Promise<ScScenario> {
    const park = await this.prisma.park.findUnique({ where: { pk_id: dto.parkId } });
    if (!park) {
      throw new Error('El parque especificado no existe');
    }

    return this.prisma.scenario.create({
      data: {
        pk_id: dto.parkId,
        sc_name: dto.name,
        sc_address: dto.address,
      },
    });
  }

  async update(sc_id: number, dto: UpdateScScenarioDto): Promise<ScScenario> {
    if (dto.parkId !== undefined) {
      const park = await this.prisma.park.findUnique({ where: { pk_id: dto.parkId } });
      if (!park) {
        throw new Error('El parque especificado no existe');
      }
    }

    return this.prisma.scenario.update({
      where: { sc_id },
      data: {
        pk_id: dto.parkId,
        sc_name: dto.name,
        sc_address: dto.address,
      },
    });
  }

  delete(sc_id: number): Promise<ScScenario> {
    return this.prisma.scenario.delete({ where: { sc_id } });
  }
}
