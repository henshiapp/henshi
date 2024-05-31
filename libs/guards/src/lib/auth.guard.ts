import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authClient: ClientProxy
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        try {
            return firstValueFrom(this.authClient.send('me', { jwt: req.cookies.access_token }));
        } catch (err) {
            return false;
        }
    }
}
