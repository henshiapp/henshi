import { Controller } from '@nestjs/common';
import { AuthServiceController, AuthServiceControllerMethods, JwtUserOrUndefined, MeRequest } from '@henshi/types';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthGrpcController implements AuthServiceController {
    constructor(private readonly authService: AuthService) {}

    me({ jwt }: MeRequest): JwtUserOrUndefined {
        if (!jwt) return { user: undefined };

        return this.authService.getTokenPayload(jwt);
    }
}
