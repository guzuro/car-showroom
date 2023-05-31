import type { User } from './User.types'

export type Password = { password: string }

export type LoginData = Pick<User, 'login'> & Password

export type RegisterData = Pick<User, 'login' | 'email'> & Password
