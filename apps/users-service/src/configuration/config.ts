require('dotenv').config();
import * as process from 'process';

export default () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3010,
    microservices: {
        auth: {
            host: process.env.MICROSERVICE_HOST || 'localhost',
            port: parseInt(process.env.MICROSERVICE_PORT) || 4000,
        },
        users: {
            host: process.env.MICROSERVICE_HOST || 'localhost',
            port: parseInt(process.env.MICROSERVICE_PORT) || 4010,
        },
    },
    client: {
        url: process.env.FRONTEND_URL,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    cookies: {
        domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.neumanf.com',
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
});
