import { CookieOptions } from 'express';
import config from '../../configuration/config';

const configuration = config();

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    domain: configuration.cookies.domain,
    secure: configuration.cookies.secure,
};

const accessTokenExpirationInMinutes = configuration.jwt.access.expiration;
const refreshTokenExpirationInMinutes = configuration.jwt.refresh.expiration;

export const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + accessTokenExpirationInMinutes * 60 * 1000),
    maxAge: accessTokenExpirationInMinutes * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + refreshTokenExpirationInMinutes * 60 * 1000),
    maxAge: refreshTokenExpirationInMinutes * 60 * 1000,
};
