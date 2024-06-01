import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: configService.get('microservices.auth.host'),
            port: configService.get('microservice.auth.port'),
        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get('port'));
}
bootstrap();
