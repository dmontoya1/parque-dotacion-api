import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateScScenarioDto {
  @ApiProperty({ example: 1, description: 'ID del parque asociado' })
  @IsNumber()
  parkId: number; 

  @ApiProperty({ example: 'Cancha Central', description: 'Nombre del escenario' })
  @IsString()
  name: string; 

  @ApiProperty({ example: 'Calle 123', description: 'Dirección del escenario' })
  @IsString()
  address: string; 
}