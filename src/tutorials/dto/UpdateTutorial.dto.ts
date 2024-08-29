import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateTutorialDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsOptional()
  @IsString()
  title?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  content?: string;

  @Expose()
  @IsOptional()
  @IsString()
  author?: string;

  @Expose()
  @IsOptional()
  @IsString()
  status?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
