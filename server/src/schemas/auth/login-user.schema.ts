import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserSchema {

    @IsNotEmpty()
    login!: string

    @IsNotEmpty()
    @MinLength(8)
    password!: string
}