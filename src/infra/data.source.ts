import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();

const configService = new ConfigService();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_DATABASE'),
  synchronize: false,
  ssl:
    configService.get('DB_SSL') === 'false'
      ? false
      : {
          rejectUnauthorized: false,
        },
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  autoLoadEntities: true,
};

const rootPath = process.cwd();

const dataSourceOptions: DataSourceOptions = {
  ...options,
  entities: [`${rootPath}/src/**/*.entity{.ts,.js}`],
  migrations: [`${rootPath}/src/infra/migrations/*{.ts,.js}`],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
