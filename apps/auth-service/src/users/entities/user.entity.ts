import { Entity } from 'typeorm';

export enum UserRole {
    FREE_USER = 'FREE_USER',
    BASIC_USER = 'BASIC_USER',
    PREMIUM_USER = 'PREMIUM_USER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    id: string;

    name: string;

    email: string;

    password: string;

    role: UserRole;

    emailConfirmed: boolean;

    refreshToken: string;

    createdAt: Date;

    updatedAt: Date;
}
