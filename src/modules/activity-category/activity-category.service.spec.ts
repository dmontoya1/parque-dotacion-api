import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCategoryService } from './activity-category.service';
import { PrismaService } from '../../prisma/prisma.service';

const prismaMock = {
  activityCategory: {
    findMany: jest.fn(),
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

  afterEach(() => {
    jest.clearAllMocks();
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
      const dto = { name: 'Deporte', description: 'desc', priorityLevel: 1 };
      const created = { ac_id: 1, ac_name: 'Deporte', ac_description: 'desc', ac_priority_level: 1 };
      prismaMock.activityCategory.create.mockResolvedValueOnce(created);

      const result = await service.create(dto as any);
      expect(result).toEqual(created);
      expect(prismaMock.activityCategory.create).toHaveBeenCalledWith({
        data: {
          ac_name: dto.name,
          ac_description: dto.description,
          ac_priority_level: dto.priorityLevel,
        },
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar una categoría por id', async () => {
      const category = { ac_id: 1, ac_name: 'Deporte', ac_description: 'desc', ac_priority_level: 1 };
      prismaMock.activityCategory.findUnique.mockResolvedValueOnce(category);

      const result = await service.findOne(1);
      expect(result).toEqual(category);
      expect(prismaMock.activityCategory.findUnique).toHaveBeenCalledWith({ where: { ac_id: 1 } });
    });
  });

  describe('update', () => {
    it('debe actualizar una categoría', async () => {
      const dto = { name: 'Arte', description: 'desc', priorityLevel: 2 };
      const updated = { ac_id: 1, ac_name: 'Arte', ac_description: 'desc', ac_priority_level: 2 };
      prismaMock.activityCategory.update.mockResolvedValueOnce(updated);

      const result = await service.update(1, dto as any);
      expect(result).toEqual(updated);
      expect(prismaMock.activityCategory.update).toHaveBeenCalledWith({
        where: { ac_id: 1 },
        data: {
          ac_name: dto.name,
          ac_description: dto.description,
          ac_priority_level: dto.priorityLevel,
        },
      });
    });
  });

  describe('delete', () => {
    it('debe eliminar una categoría', async () => {
      const deleted = { ac_id: 1, ac_name: 'Deporte', ac_description: 'desc', ac_priority_level: 1 };
      prismaMock.activityCategory.delete.mockResolvedValueOnce(deleted);

      const result = await service.delete(1);
      expect(result).toEqual(deleted);
      expect(prismaMock.activityCategory.delete).toHaveBeenCalledWith({ where: { ac_id: 1 } });
    });
  });
});
