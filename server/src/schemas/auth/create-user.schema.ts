import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserSchema {
    @IsNotEmpty()
    login!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;
}