import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { extractAccessToken } from '../utils/cookieExtractor';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
    sub: string;
    username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([extractAccessToken]),
            secretOrKey: configService.get('jwt.access.secret'),
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
