export type ModelsList = Array<ModelItem>

export type ModelItem = {
    img: string,
    value: CarModel
}

export type CarModel = 'volkswagen' | 'toyota' | 'kia' | 'audi'