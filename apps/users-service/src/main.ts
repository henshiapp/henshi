import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'node:path/win32';
import { USERS_PACKAGE_NAME } from '@henshi/types';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.get('client.url'),
        credentials: true,
    });
    app.use(cookieParser());
    app.use(helmet());

    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            package: USERS_PACKAGE_NAME,
            protoPath: join(__dirname, '../node_modules/@henshi/types/src/lib/proto/users.proto'),
            url: configService.get('microservices.users.host') + ':' + configService.get('microservices.users.port'),
        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get('port'));
}
bootstrap();
