import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { USERS_PACKAGE_NAME, USERS_SERVICE_NAME } from '@henshi/types';
import { AuthRestController } from './auth.rest.controller';
import { AuthGrpcController } from './auth.grpc.controller';
import { join } from 'node:path/win32';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: USERS_SERVICE_NAME,
                    useFactory: (configService: ConfigService) => {
                        return {
                            transport: Transport.GRPC,
                            options: {
                                package: USERS_PACKAGE_NAME,
                                protoPath: join(
                                    __dirname,
                                    '../../node_modules/@henshi/types/src/lib/proto/users.proto',
                                ),
                                url:
                                    configService.get('microservices.users.host') +
                                    ':' +
                                    configService.get('microservices.users.port'),
                            },
                        };
                    },
                    inject: [ConfigService],
                },
            ],
        }),
        JwtModule.register({}),
    ],
    controllers: [AuthRestController, AuthGrpcController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
