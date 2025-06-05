import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateActivityCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  priorityLevel: number;
}