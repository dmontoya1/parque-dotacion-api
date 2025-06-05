import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateActivityCategoryDto {
  @ApiProperty({ example: 'Deporte', description: 'Nombre de la categoría de actividad' })
  @IsString()
  ac_name: string;

  @ApiProperty({ example: 'Actividades deportivas' })
  @IsOptional()
  @IsString()
  ac_description?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  ac_priority_level: number;
}