import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: configService.get('microservice.host'),
            port: configService.get('microservice.port'),
        },
    });
    app.use(cookieParser());

    await app.startAllMicroservices();
    await app.listen(configService.get('port'));
}
bootstrap();
