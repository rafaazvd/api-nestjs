import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';

import { typeOrmModuleOptions } from './data.source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmModuleOptions,
      async dataSourceFactory(options) {
        return (
          getDataSourceByName('default') ||
          addTransactionalDataSource(new DataSource(options))
        );
      },
    }),
  ],
})
export class DbModule {}
