import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TutorialService } from './tutorials.service';
import { TutorialRepository } from './tutorials.repository';
import { CreateTutorialDto } from './dto/CreateTutorial.dto';
import { UpdateTutorialDto } from './dto/UpdateTutorial.dto';
import { FilterTutorialDto } from './dto/FilterTutorial.dto';
import { TutorialResponseDto } from './dto/TutorialResponse.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

describe('TutorialService', () => {
  let service: TutorialService;
  let tutorialRepository: TutorialRepository;
  let cacheManager: Cache;

  const mockTutorialRepository = {
    findOneBy: jest.fn(),
    findOneById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findAllTutorials: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TutorialService,
        {
          provide: TutorialRepository,
          useValue: mockTutorialRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<TutorialService>(TutorialService);
    tutorialRepository = module.get<TutorialRepository>(TutorialRepository);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  describe('create', () => {
    it('should throw conflict if title already exists', async () => {
      const createTutorialDto: CreateTutorialDto = {
        title: 'Test Tutorial',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        status: 'draft',
        userId: 1,
        tags: [],
      };

      (tutorialRepository.findOneBy as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(service.create(createTutorialDto)).rejects.toThrow(
        new HttpException(
          'Título já está sendo utilizado',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should create and save a tutorial', async () => {
      const createTutorialDto: CreateTutorialDto = {
        title: 'Test Tutorial',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        status: 'draft',
        userId: 1,
        tags: [],
      };

      const savedTutorial = {
        id: 1,
        ...createTutorialDto,
      };

      (tutorialRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      (tutorialRepository.create as jest.Mock).mockReturnValue(savedTutorial);
      (tutorialRepository.save as jest.Mock).mockResolvedValue(savedTutorial);

      expect(await service.create(createTutorialDto)).toEqual(savedTutorial);
    });
  });

  describe('findAll', () => {
    it('should return cached data if available', async () => {
      const filter: FilterTutorialDto = { page: 1 };
      const cachedData: Pagination<TutorialResponseDto> = {
        items: [
          {
            id: 1,
            title: 'Test Tutorial',
            description: 'Test Description',
            content: 'Test Content',
            author: 'Test Author',
            status: 'draft',
            tags: [],
            views: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        meta: {
          currentPage: 1,
          totalItems: 1,
          totalPages: 1,
          itemsPerPage: 10,
          itemCount: 10,
        },
      };

      (cacheManager.get as jest.Mock).mockResolvedValue(cachedData);

      expect(await service.findAll(filter)).toEqual(cachedData);
    });

    it('should fetch and cache data if not available in cache', async () => {
      const filter: FilterTutorialDto = { page: 1 };
      const fetchedData: Pagination<TutorialResponseDto> = {
        items: [
          {
            id: 1,
            title: 'Test Tutorial',
            description: 'Test Description',
            content: 'Test Content',
            author: 'Test Author',
            status: 'draft',
            tags: [],
            views: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        meta: {
          currentPage: 1,
          totalItems: 1,
          totalPages: 1,
          itemsPerPage: 10,
          itemCount: 10,
        },
      };

      (cacheManager.get as jest.Mock).mockResolvedValue(null);
      (tutorialRepository.findAllTutorials as jest.Mock).mockResolvedValue(
        fetchedData,
      );

      await service.findAll(filter);

      expect(tutorialRepository.findAllTutorials).toHaveBeenCalledWith(filter);
      expect(cacheManager.set).toHaveBeenCalledWith(
        expect.any(String),
        fetchedData,
        60,
      );
    });
  });

  describe('update', () => {
    it('should throw not found if tutorial does not exist', async () => {
      const updateTutorialDto: UpdateTutorialDto = {
        id: 1,
        title: 'Updated Title',
      };

      (tutorialRepository.findOneById as jest.Mock).mockResolvedValue(null);

      await expect(service.update(updateTutorialDto)).rejects.toThrow(
        new HttpException('Tutorial não existe!', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw conflict if new title is already in use', async () => {
      const updateTutorialDto: UpdateTutorialDto = {
        id: 1,
        title: 'Updated Title',
      };

      (tutorialRepository.findOneById as jest.Mock).mockResolvedValue({
        id: 1,
      });
      (tutorialRepository.findOneBy as jest.Mock).mockResolvedValue({ id: 2 });

      await expect(service.update(updateTutorialDto)).rejects.toThrow(
        new HttpException(
          'Título já está sendo utilizado',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should update and save the tutorial', async () => {
      const updateTutorialDto: UpdateTutorialDto = {
        id: 1,
        title: 'Updated Title',
      };

      const existingTutorial = {
        id: 1,
        title: 'Old Title',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        status: 'draft',
        tags: [],
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTutorial = {
        ...existingTutorial,
        title: 'Updated Title',
      };

      (tutorialRepository.findOneById as jest.Mock).mockResolvedValue(
        existingTutorial,
      );

      (tutorialRepository.findOneBy as jest.Mock).mockResolvedValue(null);
      (tutorialRepository.save as jest.Mock).mockResolvedValue(updatedTutorial);

      expect(await service.update(updateTutorialDto)).toEqual(updatedTutorial);
    });
  });

  describe('delete', () => {
    it('should throw not found if tutorial does not exist', async () => {
      (tutorialRepository.findOneById as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(
        new HttpException('Tutorial não existe!', HttpStatus.NOT_FOUND),
      );
    });

    it('should delete the tutorial', async () => {
      const existingTutorial = {
        id: 1,
        title: 'Test Tutorial',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        status: 'draft',
        tags: [],
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (tutorialRepository.findOneById as jest.Mock).mockResolvedValue(
        existingTutorial,
      );

      (tutorialRepository.delete as jest.Mock).mockResolvedValue(undefined);

      await service.delete(1);

      expect(tutorialRepository.findOneById).toHaveBeenCalledWith(1);
      expect(tutorialRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
