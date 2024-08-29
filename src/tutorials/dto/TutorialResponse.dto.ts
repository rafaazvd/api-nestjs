import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TutorialResponseDto {
  @Expose()
  @ApiProperty({
    description: 'ID do tutorial',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Título do tutorial',
    example: 'Como criar uma API REST com NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição do tutorial',
    example:
      'Este tutorial cobre os passos básicos para criar uma API REST usando o NestJS...',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    description: 'Conteúdo completo do tutorial',
    example:
      'Neste tutorial, você aprenderá como criar uma API REST usando o framework NestJS...',
  })
  content: string;

  @ApiProperty({
    description: 'Autor do tutorial',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    description: 'Data de criação do tutorial',
    example: '2024-08-28T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do tutorial',
    example: '2024-08-29T12:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Status do tutorial (ex: draft, published)',
    example: 'draft',
  })
  status: string;

  @ApiProperty({
    description: 'Tags associadas ao tutorial',
    example: ['NestJS', 'API', 'Backend'],
    nullable: true,
  })
  tags: string[];

  @ApiProperty({
    description: 'Número de visualizações do tutorial',
    example: 123,
  })
  views: number;
}
