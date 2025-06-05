import { ApiProperty } from '@nestjs/swagger';

export class CreateScScenarioDto {
  @ApiProperty({ example: 1, description: 'ID del parque asociado' })
  parkId: number; 

  @ApiProperty({ example: 'Cancha Central', description: 'Nombre del escenario' })
  name: string; 

  @ApiProperty({ example: 'Calle 123', description: 'Dirección del escenario' })
  address: string; 
}