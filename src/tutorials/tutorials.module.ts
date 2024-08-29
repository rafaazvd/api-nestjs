import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TutorialService } from './tutorials.service';
import { TutorialController } from './tutorials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorial } from './entities/tutorials.entity';
import { TutorialRepository } from './tutorials.repository';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    TypeOrmModule.forFeature([Tutorial]),
  ],
  controllers: [TutorialController],
  providers: [TutorialService, TutorialRepository],
  exports: [TutorialService],
})
export class TutorialsModule {}
