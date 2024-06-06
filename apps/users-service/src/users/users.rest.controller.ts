import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '@henshi/guards';

@Controller('/api/users')
export class UsersRestController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        const user = await this.usersService.findOne({ id: req.user['sub'] });
        delete user.password;
        return user;
    }
}
