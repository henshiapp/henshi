import { Controller, Get, Post, Body, Req, UseGuards, Res, BadRequestException, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessTokenGuard } from '../shared/guards/accessToken.guard';
import { RefreshTokenGuard } from '../shared/guards/refreshToken.guard';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from './utils/cookieOptions';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const { id, name, email } = await this.authService.signUp(createUserDto);
        // await this.authService.sendEmailConfirmation(id, name, email);
        return { status: 'success', message: 'Cadastro realizado com sucesso' };
    }

    @Post('login')
    async signin(@Res() res: Response, @Body() data: AuthDto) {
        const { accessToken, refreshToken } = await this.authService.signIn(data);
        res.cookie('access_token', accessToken, accessTokenCookieOptions);
        res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);
        return res.send({ accessToken, refreshToken });
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user['sub']);
        req.res.clearCookie('access_token');
        req.res.clearCookie('refresh_token');
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshTokens(@Req() req: Request, @Res() res: Response) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];

        const tokens = await this.authService.refreshTokens(userId, refreshToken);

        res.cookie('access_token', tokens.accessToken, accessTokenCookieOptions);

        return res.send(tokens);
    }

    @UseGuards(AccessTokenGuard)
    @Get('verify-email')
    async verifyEmail(@Req() req: Request, @Query('token') verificationToken: string) {
        const userId = req.user['sub'];

        const savedToken = await this.authService.getEmailConfirmationToken(userId);

        if (!savedToken) {
            throw new BadRequestException('Token expirado. Por favor realize o cadastro novamente.');
        }

        if (savedToken !== verificationToken) {
            throw new BadRequestException('Token inválido');
        }

        await this.authService.emailConfirmed(userId);

        return { status: 'success', message: 'Email verificado' };
    }

    @UseGuards(AccessTokenGuard)
    @Get('resend-email')
    async resendEmail(@Req() req: Request) {
        const userId = req.user['sub'];
        const userName = req.user['name'];
        const userEmail = req.user['email'];

        await this.authService.sendEmailConfirmation(userId, userName, userEmail);

        return { status: 'success', message: 'Um novo email de confirmação foi enviado' };
    }

    @MessagePattern('me')
    async isLoggedIn({ jwt }: { jwt?: string }) {
        if (!jwt) return false;

        return this.authService.getTokenPayload(jwt);
    }
}
