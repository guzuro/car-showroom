import HttpClient from "./HttpClient";

class AuthApi extends HttpClient {
    constructor() {
        super()
    }
    async login(body: any) {
        return await this.post('/auth/login', body)
    }

    async signUp(body: any) {
        return await this.post('/auth/register', body)
    }
}

export default new AuthApi()
