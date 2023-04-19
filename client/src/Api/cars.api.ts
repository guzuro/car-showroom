import type { CarInfo } from "../types/CarInfo.type"
import HttpClient from "./HttpClient"

class CarsApi extends HttpClient {
    constructor() {
        super()
    }

    async randomCars() {
        return await this.get<Array<CarInfo>>('/randomCars')
    }

    async carsByModel(body: any) {
        return await this.get<Array<CarInfo>>('/carsbymodel', body)
    }
}

export default new CarsApi()
