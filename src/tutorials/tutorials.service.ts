import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Tutorial } from './entities/tutorials.entity';
import { UpdateTutorialDto } from './dto/UpdateTutorial.dto';
import { TutorialRepository } from './tutorials.repository';
import { CreateTutorialDto } from './dto/CreateTutorial.dto';
import { FilterTutorialDto } from './dto/FilterTutorial.dto';
import { TutorialResponseDto } from './dto/TutorialResponse.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class TutorialService {
  constructor(
    @InjectRepository(TutorialRepository)
    private tutorialRepository: TutorialRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    const tutorialExists = await this.tutorialRepository.findOneBy({
      title: createTutorialDto.title,
    });

    if (tutorialExists) {
      throw new HttpException(
        'Título já está sendo utilizado',
        HttpStatus.CONFLICT,
      );
    }

    const tutorial = this.tutorialRepository.create(createTutorialDto);
    return this.tutorialRepository.save(tutorial);
  }

  async findAll(
    filter: FilterTutorialDto,
  ): Promise<Pagination<TutorialResponseDto>> {
    const pageNumber = filter.page || 1;
    const limit = 10;

    const cacheKey = `tutorials_${filter.title || ''}_${filter.startDate || ''}${filter.endDate || ''}_${pageNumber}_${limit}`;
    const cachedData =
      await this.cacheManager.get<Pagination<TutorialResponseDto>>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const data = await this.tutorialRepository.findAllTutorials(filter);

    await this.cacheManager.set(cacheKey, data, 60);

    return data;
  }

  async update(updateTutorialDto: UpdateTutorialDto): Promise<Tutorial> {
    const tutorialExists = await this.tutorialRepository.findOneById(
      updateTutorialDto.id,
    );

    if (!tutorialExists) {
      throw new HttpException('Tutorial não existe!', HttpStatus.NOT_FOUND);
    }

    const title = await this.tutorialRepository.findOneBy({
      title: updateTutorialDto.title,
    });

    if (title) {
      throw new HttpException(
        'Título já está sendo utilizado',
        HttpStatus.CONFLICT,
      );
    }

    const updateData = Object.entries(updateTutorialDto)
      .filter(([, value]) => value !== null && value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    Object.assign(tutorialExists, updateData);

    return this.tutorialRepository.save(tutorialExists);
  }

  async delete(id: number): Promise<void> {
    const tutorialExists = await this.tutorialRepository.findOneById(id);

    if (!tutorialExists) {
      throw new HttpException('Tutorial não existe!', HttpStatus.NOT_FOUND);
    }

    await this.tutorialRepository.delete(id);
  }
}
