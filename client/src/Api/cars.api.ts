import type { CarInfo } from "../types/CarInfo.type"
import HttpClient from "./HttpClient"

class CarsApi extends HttpClient {
    constructor() {
        super()
    }

    async randomCars() {
        return await this.get<Array<CarInfo>>('/randomCars')
    }

    async getCars(body: Record<string, string | number>) {
        return await this.get<Array<CarInfo>>('/getcars', body)
    }
}

export default new CarsApi()
