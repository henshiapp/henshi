import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import config from './configuration/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { CacheStore } from '@nestjs/common/cache';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.production`,
            load: [config],
        }),
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                store: (await redisStore({
                    url: config.get('cache.url'),
                    ttl: 15 * 60, // 15 min
                })) as unknown as CacheStore,
                ttl: 15 * 60, // 15 min,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
