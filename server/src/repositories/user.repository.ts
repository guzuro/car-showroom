import { AppDataSource } from "../config/data-source";
import { CreateUserDto } from "../dto/User/create-user.dto";
import { User } from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User);

export const saveUser = async (newUser: CreateUserDto) => {
    return await userRepository.save({ ...newUser })
}

export const getUserByLogin = async (login: string) => {
    return await userRepository.findOne({
        where: {
            login
        },
        relations: ['wishes', 'wishes.items'],
    })
}

export const getUserById = async (id: number) => {
    return await userRepository.findOne({
        where: {
            id
        },
    })
}