import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty({
    description: 'Quantidade de itens retornados na consulta atual.',
  })
  itemCount?: number;

  @ApiProperty({ description: 'Total de itens no banco de dados.' })
  totalItems?: number;

  @ApiProperty({
    description: 'Quantos itens estão sendo retornados ao máximo por consulta.',
  })
  itemsPerPage?: number;

  @ApiProperty({
    description:
      "Total da divisão entre os campos 'itemsPerPage' e 'totalItems', mostrando a quantidade de páginas.",
  })
  totalPages?: number;

  @ApiProperty({
    description: 'Mostra qual é a página atual da consulta realizada.',
  })
  currentPage?: number;
}
