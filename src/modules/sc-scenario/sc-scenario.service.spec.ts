import { Test, TestingModule } from '@nestjs/testing';
import { ScScenarioService } from './sc-scenario.service';

describe('ScScenarioService', () => {
  let service: ScScenarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScScenarioService],
    }).compile();

    service = module.get<ScScenarioService>(ScScenarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
