import { UserRole } from '../entities/user.entity';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsStrongPassword,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @MinLength(3)
    @MaxLength(255)
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    refreshToken?: string;

    @IsOptional()
    @IsBoolean()
    emailConfirmed?: boolean;
}
