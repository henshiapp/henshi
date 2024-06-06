import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { OptionalUser } from '@henshi/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }

    findAll(query: PaginateQuery): Promise<Paginated<User>> {
        return paginate(query, this.usersRepository, {
            sortableColumns: ['id', 'name', 'email', 'role', 'emailConfirmed', 'createdAt', 'updatedAt'],
            searchableColumns: ['name', 'email', 'role'],
            select: ['id', 'name', 'email', 'role', 'emailConfirmed', 'createdAt', 'updatedAt'],
        });
    }

    async findOne(query: Partial<User>) {
        return this.usersRepository.findOneBy(query);
    }

    update(data: OptionalUser) {
        const { id, ...rest } = data;
        return this.usersRepository.update({ id }, rest);
    }

    remove(id: string) {
        return this.usersRepository.delete({ id });
    }

    findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }
}
