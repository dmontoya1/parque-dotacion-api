import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateActivityCategoryDto {
  @IsString()
  ac_name: string;

  @IsOptional()
  @IsString()
  ac_description?: string;

  @IsInt()
  @Min(1)
  ac_priority_level: number;
}