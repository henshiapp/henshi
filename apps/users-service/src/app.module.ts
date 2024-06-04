import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configuration/config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { databaseConfig } from './database/data-source';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.env`,
            load: [config],
        }),
        TypeOrmModule.forRoot(databaseConfig),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
