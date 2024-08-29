import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateTutorialDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  author: string;

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
