export interface UserJwt {
    sub: string;
    name: string;
    email: string;
    role: number;
    emailConfirmed: boolean;
    iat: number;
    exp: number;
}
