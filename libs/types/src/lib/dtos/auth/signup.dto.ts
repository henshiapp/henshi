import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiResponse } from '../api-response';

export class SignUpDto {
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
}

export class SignUpResponse extends ApiResponse {
    constructor() {
        super('success', 'A confirmation email was sent to you');
    }
}
