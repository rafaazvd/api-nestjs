import { IsNotEmpty, IsInt } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class TutorialIdDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
