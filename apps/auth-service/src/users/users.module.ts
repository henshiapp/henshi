import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: 'USERS_SERVICE',
                    useFactory: (configService: ConfigService) => {
                        return {
                            transport: Transport.TCP,
                            options: {
                                host: configService.get('microservices.users.host'),
                                port: configService.get('microservices.users.port'),
                            },
                        }
                    },
                    inject: [ConfigService]

                },
            ]
        }),
    ],
    controllers: [],
    providers: [UsersService],
})
export class UserModule { }
