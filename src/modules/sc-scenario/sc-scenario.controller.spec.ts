import { Test, TestingModule } from '@nestjs/testing';
import { ScScenarioController } from './sc-scenario.controller';

describe('ScScenarioController', () => {
  let controller: ScScenarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScScenarioController],
    }).compile();

    controller = module.get<ScScenarioController>(ScScenarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
