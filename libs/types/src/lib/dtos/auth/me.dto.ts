export interface UserJwt {
    sub: string;
    name: string;
    email: string;
    role: string;
    emailConfirmed: boolean;
    iat: number;
    exp: number;
}
