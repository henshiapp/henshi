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
                    host: 'localhost',
                    port: 4010,
                },
            },
        ]),
    ],
    controllers: [],
    providers: [UsersService],
})
export class UserModule {}
