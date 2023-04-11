import { Request, Response, NextFunction } from "express";
import { hash, compare } from 'bcrypt';
import { getUserByLogin, saveUser } from "../repositories/user.repository";
import TypeOrmException from "../exceptions/TypeOrmException";
import HttpException from "../exceptions/HttpException";

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { login, email, password } = req.body

    const hashPass = await hash(password, 10)

    try {
        await saveUser({
            login,
            email,
            password: hashPass
        })

        res.statusCode = 200;
        res.send({
            message: 'User created, log in with your login and password!'
        })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }

}

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body

    try {
        const user = await getUserByLogin(login)

        if (user) {
            const passwordIsOk = await verifyPassword(password, user.password!)

            if (passwordIsOk) {
                res.statusCode = 200;
                delete user.password;

                res.send(user)
            } else {
                next(new HttpException(401, 'Wrong password'))
            }
        } else {
            next(new HttpException(401, 'Wrong login'))
        }
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}

const verifyPassword = async (plainPass: string, hashPass: string) => {
    return compare(plainPass, hashPass)
}