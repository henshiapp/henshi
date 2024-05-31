import { Controller, Get, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Roles } from '@henshi/decorators';
import { UserRole } from '@henshi/models';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@henshi/guards';
import { User } from './entities/user.entity';

@Controller('/api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    findAll(@Paginate() query: PaginateQuery) {
        return this.usersService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        const user = await this.usersService.findOne(req.user['sub']);
        delete user.password;
        return user;
    }

    @MessagePattern('findOne')
    findOne(query: Partial<User>) {
        return this.usersService.findOne(query);
    }

    @MessagePattern('update')
    update({ userId, data }: { userId: string; data: Partial<User> }) {
        return this.usersService.update(userId, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
