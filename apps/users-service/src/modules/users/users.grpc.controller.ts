import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import {
    CreateUserRequest,
    UsersServiceController,
    UsersServiceControllerMethods,
    OptionalUser,
    UserOrUndefined,
    ComparePasswordsRequest,
    ComparePasswordsResponse,
} from '@henshi/types';

@Controller()
@UsersServiceControllerMethods()
export class UsersGrpcController implements UsersServiceController {
    constructor(private readonly usersService: UsersService) {}

    async create(request: CreateUserRequest): Promise<UserOrUndefined> {
        return { user: await this.usersService.create(request) };
    }

    async findOne(request: OptionalUser): Promise<UserOrUndefined> {
        return { user: await this.usersService.findOne(request) };
    }

    async update(request: OptionalUser): Promise<void> {
        const { id, ...rest } = request;
        await this.usersService.update(id, rest);
    }

    async comparePasswords(request: ComparePasswordsRequest): Promise<ComparePasswordsResponse> {
        return { match: await this.usersService.comparePasswords(request.userId, request.password) };
    }
}
