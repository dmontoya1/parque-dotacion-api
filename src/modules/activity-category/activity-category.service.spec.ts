import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCategoryService } from './activity-category.service';
import { PrismaService } from '../../prisma/prisma.service';


// Ejemplo de mock de PrismaService en un test
const prismaMock = {
  activityCategory: {
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn(),       
    findUnique: jest.fn(),   
    update: jest.fn(),       
    delete: jest.fn(),       
  },
};

describe('ActivityCategoryService', () => {
  let service: ActivityCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityCategoryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ActivityCategoryService>(ActivityCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debe retornar un array vacío si no hay categorías', async () => {
      prismaMock.activityCategory.findMany.mockResolvedValueOnce([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.activityCategory.findMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('debe crear una nueva categoría', async () => {
      const dto = { name: 'Deporte' };
      const created = { id: 1, name: 'Deporte' };
      prismaMock.activityCategory.create = jest.fn().mockResolvedValue(created);

      const result = await service.create(dto as any);
      expect(result).toEqual(created);
      expect(prismaMock.activityCategory.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findOne', () => {
    it('debe retornar una categoría por id', async () => {
      const category = { id: 1, name: 'Música' };
      prismaMock.activityCategory.findUnique = jest.fn().mockResolvedValue(category);

      const result = await service.findOne(1);
      expect(result).toEqual(category);
      expect(prismaMock.activityCategory.findUnique).toHaveBeenCalledWith({ where: { ac_id: 1 } });
    });
  });

  describe('update', () => {
    it('debe actualizar una categoría', async () => {
      const dto = { name: 'Arte' };
      const updated = { ac_id: 1, name: 'Arte' };
      prismaMock.activityCategory.update = jest.fn().mockResolvedValue(updated);

      const result = await service.update(1, dto as any);
      expect(result).toEqual(updated);
      expect(prismaMock.activityCategory.update).toHaveBeenCalledWith({ where: { ac_id: 1 }, data: dto });
    });
  });

  describe('delete', () => {
    it('debe eliminar una categoría', async () => {
      const deleted = { id: 1, name: 'Ciencia' };
      prismaMock.activityCategory.delete = jest.fn().mockResolvedValue(deleted);

      const result = await service.delete(1);
      expect(result).toEqual(deleted);
      expect(prismaMock.activityCategory.delete).toHaveBeenCalledWith({ where: { ac_id: 1 } });
    });
  });
});
