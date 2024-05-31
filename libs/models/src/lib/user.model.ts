import { UserRole } from './user-role.enum';

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    emailConfirmed: boolean;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}
