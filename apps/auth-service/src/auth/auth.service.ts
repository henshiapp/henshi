import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, User } from '@henshi/types';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as crypto from 'node:crypto';
// import { emailTransporter } from '../mail/transport';
// import { getEmailConfirmationBody } from '../mail/body';

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const userExists = await this.usersService.findOne({
            email: signUpDto.email,
        });

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hash = await this.hashData(signUpDto.password);

        const newUser = await this.usersService.create({
            ...signUpDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser);

        await this.updateRefreshToken(newUser.id, tokens.refreshToken);

        return newUser;
    }

    async signIn(data: AuthDto) {
        const user = await this.usersService.findOne({ email: data.email });

        if (!user) throw new BadRequestException('The credentials are invalid');

        const passwordMatches = await argon2.verify(user.password, data.password);

        if (!passwordMatches) throw new BadRequestException('The credentials are invalid');

        const tokens = await this.getTokens(user);

        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.getAccessToken(user),
            this.getRefreshToken(user.id),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async getAccessToken(user: User) {
        return this.jwtService.signAsync(
            {
                sub: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailConfirmed: user.emailConfirmed,
            },
            {
                secret: this.configService.get('jwt.access.secret'),
                expiresIn: this.configService.get('jwt.access.expiration') + 'm',
            },
        );
    }

    async getRefreshToken(userId: string) {
        return this.jwtService.signAsync(
            {
                sub: userId,
            },
            {
                secret: this.configService.get('jwt.refresh.secret'),
                expiresIn: this.configService.get('jwt.refresh.expiration') + 'm',
            },
        );
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findOne({ id: userId });

        if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const accessToken = await this.getAccessToken(user);

        return { accessToken: accessToken, refreshToken: user.refreshToken };
    }

    async getEmailConfirmationToken(userId: number) {
        return this.cacheManager.get('emailConfirmationToken:' + userId);
    }

    async emailConfirmed(userId: string) {
        await this.cacheManager.del('emailConfirmationToken:' + userId);
        await this.usersService.update(userId, { emailConfirmed: true });
    }

    async sendEmailConfirmation(userId: string, userName: string, userEmail: string) {
        const A_DAY_IN_SECONDS = 86_400;
        const verificationToken = crypto.randomBytes(64).toString('hex');

        await this.cacheManager.set('emailConfirmationToken:' + userId, verificationToken, {
            ttl: A_DAY_IN_SECONDS,
        } as any);

        const url = `${this.configService.get('client.url')}/verify-account?token=${verificationToken}`;

        // await emailTransporter.sendMail({
        //     from: '"Trilha Investidor" <info@trilhainvestidor.com.br>',
        //     to: userEmail,
        //     subject: '[Henshi] Verify your account',
        //     html: getEmailConfirmationBody(userName, url),
        // });
    }

    getTokenPayload(jwt: string) {
        try {
            return this.jwtService.verify(jwt, {
                secret: this.configService.get('jwt.access.secret'),
            });
        } catch (e) {
            return false;
        }
    }
}
