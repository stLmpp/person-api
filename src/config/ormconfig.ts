import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NamingStrategy } from '../typeorm-naming-strategy';
import { resolve } from 'path';

export function getTypeormConfig(): TypeOrmModuleOptions {
  return {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    synchronize: false,
    type: 'postgres',
    autoLoadEntities: true,
    logging: 'all',
    namingStrategy: new NamingStrategy(),
    dropSchema: false,
    migrations: [resolve(process.cwd(), 'migration/*.js')],
    cli: { migrationsDir: 'migration' },
  };
}
