import type { CarModel } from "../components/CarModels/types"
import type { CarInfo } from "./CarInfo.type"

export type Wish = {
    id: number
    carModel: CarModel
    carIndex: number
    carInfo: CarInfo
}