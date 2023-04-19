export type CarInfo = {
    city_mpg: number
    class: string
    combination_mpg: number
    cylinders: Cylinders
    displacement: number
    drive: DriveType
    fuel_type: FuelType
    highway_mpg: number
    make: string
    model: string
    transmission: Transmission
    year: number
}

export const enum FuelType {
    Gas = 'gas',
    Diesel = 'diesel',
    Electricity = 'electricity',

}

export const enum DriveType {
    Fwd = 'fwd',
    Rwd = 'rwd',
    Awd = 'awd',
    FullWd = '4wd',
}

export const enum Transmission {
    Manual = 'm',
    Automatic = 'a'
}

export type Cylinders = 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16