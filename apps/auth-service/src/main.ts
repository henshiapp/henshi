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
            host: 'localhost',
            port: configService.get('port') + 1000,
        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get('port'));
}
bootstrap();
