import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import config from './configuration/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.env`,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => 
                ({
                type: 'postgres',
                url: configService.get('database.url'),
                entities: [
                    User,
                ],
                migrations: [join(__dirname, 'migrations', '*.ts')],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
