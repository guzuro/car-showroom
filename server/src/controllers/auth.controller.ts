import { Request, Response, NextFunction } from "express";
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from "../dto/create-user.dto";
import { saveUser } from "../repositories/user.repository";
import { TypeORMError } from "typeorm";
import { errorHandler } from "../errorHandler";

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { login, email, password } = req.body

    const hashPass = await hash(password, 10)

    try {
        await saveUser({
            login,
            email,
            password: hashPass
        })

        res.send()
    } catch (error: any) {
        return errorHandler(error, res)
    }

}