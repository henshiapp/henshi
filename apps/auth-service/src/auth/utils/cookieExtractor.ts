import { Request } from 'express';

export function extractAccessToken(req: Request) {
    return req && req.cookies ? req.cookies['access_token'] : null;
}

export function extractRefreshToken(req: Request) {
    return req && req.cookies ? req.cookies['refresh_token'] : null;
}
