import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TutorialService } from './tutorials.service';
import { CreateTutorialDto } from './dto/CreateTutorial.dto';
import { UpdateTutorialDto } from './dto/UpdateTutorial.dto';
import { FilterTutorialDto } from './dto/FilterTutorial.dto';
import { TutorialResponseDto } from './dto/TutorialResponse.dto';
import { TutorialIdDto } from './dto/TutorialId.dto';
import { PageDto } from './dto/PaginationDto.dto';

@ApiTags('Tutoriais')
@Controller('tutorial')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createTutorialDto: CreateTutorialDto,
  ): Promise<TutorialResponseDto> {
    return this.tutorialService.create(createTutorialDto);
  }

  @ApiBearerAuth()
  @Get()
  async findAll(
    @Query() filterTutorialDto: FilterTutorialDto,
  ): Promise<PageDto<TutorialResponseDto>> {
    return this.tutorialService.findAll(filterTutorialDto);
  }

  @ApiBearerAuth()
  @Patch()
  async update(
    @Body() updateTutorialDto: UpdateTutorialDto,
  ): Promise<TutorialResponseDto> {
    return this.tutorialService.update(updateTutorialDto);
  }

  @ApiBearerAuth()
  @Delete()
  async delete(@Query() data: TutorialIdDto): Promise<void> {
    return this.tutorialService.delete(data.id);
  }
}
