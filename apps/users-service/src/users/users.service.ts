import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';

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

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update({ id }, updateUserDto);
    }

    remove(id: string) {
        return this.usersRepository.delete({ id });
    }

    findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }
}
