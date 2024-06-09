import { defineConfig } from '@mikro-orm/postgresql';
import configuration from '../configuration/config';
import { Migrator } from '@mikro-orm/migrations';
import { BaseRepository } from '@henshi/abstract';

const config = configuration();

export default defineConfig({
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    clientUrl: config.database.url,
    entityRepository: BaseRepository,
    migrations: {
        path: './dist/database/migrations',
        pathTs: './src/database/migrations',
    },
    extensions: [Migrator],
});
