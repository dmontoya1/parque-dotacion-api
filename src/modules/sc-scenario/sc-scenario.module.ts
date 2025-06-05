import { Module } from '@nestjs/common';
import { ScScenarioService } from './sc-scenario.service';
import { ScScenarioController } from './sc-scenario.controller';

@Module({
  providers: [ScScenarioService],
  controllers: [ScScenarioController]
})
export class ScScenarioModule {}
