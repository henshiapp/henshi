import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/**/*.ts'],
    migrationsTableName: 'migrations',
} as DataSourceOptions;

export default new DataSource(databaseConfig);
