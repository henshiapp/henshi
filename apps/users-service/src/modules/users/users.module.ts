import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRestController } from './users.rest.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UsersGrpcController } from './users.grpc.controller';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@henshi/types';
import { join } from 'node:path/win32';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: AUTH_SERVICE_NAME,
                    useFactory: (configService: ConfigService) => {
                        return {
                            transport: Transport.GRPC,
                            options: {
                                package: AUTH_PACKAGE_NAME,
                                protoPath: join(
                                    __dirname,
                                    '../../../node_modules/@henshi/types/src/lib/proto/auth.proto',
                                ),
                                url:
                                    configService.get('microservices.auth.host') +
                                    ':' +
                                    configService.get('microservices.auth.port'),
                            },
                        };
                    },
                    inject: [ConfigService],
                },
            ],
        }),
        MikroOrmModule.forFeature([User]),
    ],
    controllers: [UsersRestController, UsersGrpcController],
    providers: [UsersService],
})
export class UserModule {}
