import { Test, TestingModule } from '@nestjs/testing';
import { ScScenarioController } from './sc-scenario.controller';
import { ScScenarioService } from './sc-scenario.service';

describe('ScScenarioController', () => {
  let controller: ScScenarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScScenarioController],
      providers: [
        {
          provide: ScScenarioService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ScScenarioController>(ScScenarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
