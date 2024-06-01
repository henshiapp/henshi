import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: 'AUTH_SERVICE',
                    useFactory: (configService: ConfigService) => {
                        return {
                            transport: Transport.TCP,
                            options: {
                                host: configService.get('microservices.auth.host'),
                                port: configService.get('microservices.auth.port'),
                            },
                        }
                    },
                    inject: [ConfigService]
                },
            ]
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UserModule { }
