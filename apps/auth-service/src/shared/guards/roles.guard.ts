import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    private rolesMap = {
        [UserRole.FREE_USER]: 1,
        [UserRole.BASIC_USER]: 2,
        [UserRole.PREMIUM_USER]: 3,
        [UserRole.ADMIN]: 4,
    };

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        const minimumRole = requiredRoles[0];

        return this.rolesMap[user.role] >= this.rolesMap[minimumRole];
    }
}
