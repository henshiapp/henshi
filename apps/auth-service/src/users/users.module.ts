import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'users-service',
                    port: 3001,
                },
            },
        ]),
    ],
    controllers: [],
    providers: [UsersService],
})
export class UserModule {}
