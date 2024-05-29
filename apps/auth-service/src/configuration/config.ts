require('dotenv').config();
import * as process from 'process';

export default () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
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
        domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.trilhainvestidor.com.br',
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
