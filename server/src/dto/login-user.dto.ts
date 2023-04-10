import { User } from "../entities/user.entity";

export type LoginUserDto = Pick<User, "login" | "password">
