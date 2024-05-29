import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly usersClient: ClientProxy) {}

    findOne(query: Record<string, any>) {
        return firstValueFrom(this.usersClient.send<User>('findOne', query));
    }

    create(data: Record<string, any>) {
        return firstValueFrom(this.usersClient.send('create', data));
    }

    update(userId: string, data: Record<string, any>) {
        return firstValueFrom(this.usersClient.send('update', { userId, data }));
    }
}
