import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@henshi/decorators';
import { UserRole } from '@henshi/types';

@Injectable()
export class RolesGuard implements CanActivate {
    private rolesMap: Record<string, number> = {
        [UserRole.FREE_USER]: 0,
        [UserRole.ADMIN]: 1,
    };

    constructor(private readonly reflector: Reflector) {}

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

        if (!user) {
            return false;
        }

        return this.rolesMap[user.role] >= this.rolesMap[minimumRole];
    }
}
