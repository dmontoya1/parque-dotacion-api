import { Test, TestingModule } from '@nestjs/testing';
import { ScPartitionController } from './sc_partition.controller';

describe('ScPartitionController', () => {
  let controller: ScPartitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScPartitionController],
    }).compile();

    controller = module.get<ScPartitionController>(ScPartitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
