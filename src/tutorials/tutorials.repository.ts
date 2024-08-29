import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Tutorial } from './entities/tutorials.entity';
import { FilterTutorialDto } from './dto/FilterTutorial.dto';
import { TutorialResponseDto } from './dto/TutorialResponse.dto';

@Injectable()
export class TutorialRepository extends Repository<Tutorial> {
  constructor(dataSource: DataSource) {
    super(Tutorial, dataSource.createEntityManager());
  }
  async findAllTutorials(
    filter: FilterTutorialDto,
  ): Promise<Pagination<TutorialResponseDto>> {
    const pageNumber = filter.page || 1;
    const limit = 10;

    const query = this.createQueryBuilder('tutorial').select([
      'tutorial.id',
      'tutorial.title',
      'tutorial.content',
      'tutorial.createdAt',
      'tutorial.updatedAt',
    ]);

    if (filter.title) {
      query.andWhere('tutorial.title LIKE :title', {
        title: `%${filter.title}%`,
      });
    }

    if (filter.startDate && filter.endDate) {
      query.andWhere(
        '(tutorial.createdAt BETWEEN :startDate AND :endDate OR tutorial.updatedAt BETWEEN :startDate AND :endDate)',
        { startDate: filter.startDate, endDate: filter.endDate },
      );
    }

    query.skip((pageNumber - 1) * limit).take(limit);

    const [results, total] = await query.getManyAndCount();

    const paginationData: Pagination<TutorialResponseDto> = {
      items: results,
      meta: {
        currentPage: pageNumber,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        itemCount: 10,
        itemsPerPage: 10,
      },
    };

    return paginationData;
  }

  async findOneById(id: number) {
    const tutorialExists = await this.findOneBy({
      id,
    });
    return tutorialExists;
  }
}
