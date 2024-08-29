import { Test, TestingModule } from '@nestjs/testing';
import { TutorialController } from './tutorials.controller';
import { TutorialService } from './tutorials.service';
import { CreateTutorialDto } from './dto/CreateTutorial.dto';
import { UpdateTutorialDto } from './dto/UpdateTutorial.dto';
import { FilterTutorialDto } from './dto/FilterTutorial.dto';
import { TutorialResponseDto } from './dto/TutorialResponse.dto';
import { PageDto } from './dto/PaginationDto.dto';
import { TutorialIdDto } from './dto/TutorialId.dto';

describe('TutorialController', () => {
  let controller: TutorialController;
  let service: TutorialService;

  const mockTutorialService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialController],
      providers: [
        {
          provide: TutorialService,
          useValue: mockTutorialService,
        },
      ],
    }).compile();

    controller = module.get<TutorialController>(TutorialController);
    service = module.get<TutorialService>(TutorialService);
  });

  describe('create', () => {
    it('should create a tutorial', async () => {
      const createTutorialDto: CreateTutorialDto = {
        title: 'Test Tutorial',
        description: 'Test Description',
        content: 'Test Content',
        author: 'Test Author',
        status: 'draft',
        userId: 1,
        tags: [],
      };

      const result: any = { id: 1, ...createTutorialDto };
      result.user = {} as any;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createTutorialDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return a list of tutorials', async () => {
      const filter: FilterTutorialDto = { page: 1 };
      const result: PageDto<TutorialResponseDto> = {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll(filter)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a tutorial', async () => {
      const updateTutorialDto: UpdateTutorialDto = {
        id: 1,
        title: 'Updated Title',
      };

      const result: TutorialResponseDto = {
        id: 1,
        title: 'Updated Title',
        content: 'Test Content',
        description: 'Test Description',
        author: 'Test Author',
        status: 'draft',
        tags: [],
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(updateTutorialDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a tutorial', async () => {
      const tutorialIdDto: TutorialIdDto = { id: 1 };
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await expect(controller.delete(tutorialIdDto)).resolves.toBeUndefined();
    });
  });
});
