import HttpClient from "./HttpClient";

class AuthApi {
    constructor(private httpClient: typeof HttpClient) { }

    async login(body: any) {
        return await this.httpClient.post('/auth/login', body)
    }

    async signUp(body: any) {
        return await this.httpClient.post('/auth/register', body)
    }
}

export default new AuthApi(HttpClient)
