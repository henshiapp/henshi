import { CanActivate, ExecutionContext, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@henshi/types';

@Injectable()
export class AuthGuard implements OnModuleInit, CanActivate {
    private authService: AuthServiceClient;

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly authClient: ClientGrpc,
    ) {}

    onModuleInit() {
        this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        try {
            const { user } = await firstValueFrom(this.authService.me({ jwt: req.cookies.access_token }));

            if (!user) return false;

            req.user = user;

            return true;
        } catch (err) {
            return false;
        }
    }
}
