import { PartialType } from '@nestjs/swagger';
import { CreateScScenarioDto } from './create-sc-scenario.dto';

export class UpdateScScenarioDto extends PartialType(CreateScScenarioDto) {}