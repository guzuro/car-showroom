import type { LoginData, RegisterData } from "../types/Auth.types";
import type { User } from "../types/User.types";
import HttpClient from "./HttpClient";

class AuthApi extends HttpClient {
    constructor() {
        super()
    }

    async login(body: LoginData) {
        return await this.post<User>('/auth/login', body)
    }

    async signUp(body: RegisterData) {
        return await this.post<{ message: string }>('/auth/register', body)
    }
}

export default new AuthApi()
