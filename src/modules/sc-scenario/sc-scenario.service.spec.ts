import { Test, TestingModule } from '@nestjs/testing';
import { ScScenarioService } from './sc-scenario.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ScScenarioService', () => {
  let service: ScScenarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScScenarioService,
        {
          provide: PrismaService,
          useValue: {}, // Mock vacío, puedes agregar métodos si los necesitas
        },
      ],
    }).compile();

    service = module.get<ScScenarioService>(ScScenarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
