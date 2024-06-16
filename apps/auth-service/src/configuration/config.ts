require('dotenv').config({
    path: '../../.env.production',
});
import * as process from 'process';

export default () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    microservices: {
        auth: {
            host: process.env.AUTH_MICROSERVICE_HOST || 'localhost',
            port: parseInt(process.env.AUTH_MICROSERVICE_PORT) || 4000,
        },
        users: {
            host: process.env.USERS_MICROSERVICE_HOST || 'localhost',
            port: parseInt(process.env.USERS_MICROSERVICE_PORT) || 4010,
        },
    },
    client: {
        url: process.env.FRONTEND_URL,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    cache: {
        url: process.env.REDIS_URL,
    },
    cookies: {
        domain: process.env.COOKIE_DOMAIN || 'localhost',
        secure: process.env.NODE_ENV !== 'development',
    },
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiration: parseInt(process.env.JWT_ACCESS_EXPIRATION) || 15,
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiration: parseInt(process.env.JWT_REFRESH_EXPIRATION) || 10_080,
        },
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT) || 465,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
    },
});
