import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { Expose } from 'class-transformer';

export class PageDto<T> {
  @Expose()
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: 'Retorno dos dados',
  })
  items: T[];

  @ApiProperty({
    type: () => PageMetaDto,
    description: 'Estado atual da paginação',
  })
  meta: PageMetaDto;

  constructor(items: T[], meta: PageMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
