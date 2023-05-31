export type ModelsList = Array<ModelItem>

export type ModelItem = {
  img: string
  value: CarModel
}

export enum CarModel {
  volkswagen = 'volkswagen',
  toyota = 'toyota',
  kia = 'kia',
  audi = 'audi'
}
