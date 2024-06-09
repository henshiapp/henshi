import { Module, Scope } from '@nestjs/common';
import config from './configuration/config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './database/mikro-orm.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.env`,
            load: [config],
        }),
        MikroOrmModule.forRoot({ ...mikroOrmConfig, registerRequestContext: false, scope: Scope.REQUEST }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
