import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { extractRefreshToken } from '../utils/cookieExtractor';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshToken]),
            secretOrKey: configService.get('jwt.refresh.secret'),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = extractRefreshToken(req);
        return { ...payload, refreshToken };
    }
}
