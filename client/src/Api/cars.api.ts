import HttpClient from "./HttpClient"

class CarsApi extends HttpClient {
    constructor() {
        super()
    }

    async carsByModel(body: any) {
        return await this.get('/carsbymodel', body)
    }

    async signUp(body: any) {
        return await this.post('/auth/register', body)
    }
}

export default new CarsApi()
