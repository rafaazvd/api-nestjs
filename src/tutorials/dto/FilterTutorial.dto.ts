import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTutorialDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  // @Transform(({ value }) => new Date(value))
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  // @Transform(({ value }) => new Date(value))
  @IsDateString()
  endDate?: Date;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  page: number;
}
