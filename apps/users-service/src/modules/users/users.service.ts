import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { OptionalUser } from '@henshi/types';
import { BaseRepository } from '@henshi/abstract';
import { BaseService } from '@henshi/abstract/dist/lib/base.service';

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto, OptionalUser> {
    protected searchBy = ['name', 'email'];

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: BaseRepository<User>,
    ) {
        super(usersRepository);
    }

    async comparePasswords(userId: string, password: string) {
        const user = await this.usersRepository.findOne({ id: userId });

        if (!user) return false;

        return user.comparePasswords(password);
    }
}
