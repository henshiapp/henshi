import { createTransport } from 'nodemailer';
import config from '../configuration/config';

const configuration = config();

export const emailTransporter = createTransport({
    host: configuration.mail.host,
    port: configuration.mail.port,
    secure: true,
    auth: {
        user: configuration.mail.user,
        pass: configuration.mail.password,
    },
});
