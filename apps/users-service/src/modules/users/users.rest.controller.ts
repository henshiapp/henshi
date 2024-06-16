import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '@henshi/guards';
import { OptionalUser, UserRole } from '@henshi/types';
import { BaseControllerFactory } from '@henshi/abstract';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/users')
export class UsersRestController extends BaseControllerFactory<User, CreateUserDto, OptionalUser>({
    authRequired: true,
    role: UserRole.ADMIN,
}) {
    constructor(public readonly usersService: UsersService) {
        super(usersService);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Req() req: any) {
        const user: any = req.user;
        return this.usersService.findOne({ id: user['sub'] });
    }
}
