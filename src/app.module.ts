import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { DbModule } from './infra/db.module';
import { TutorialsModule } from './tutorials/tutorials.module';

@Module({
  imports: [DbModule, UsersModule, TutorialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
