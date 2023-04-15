import { useLoader } from '../composables/useLoader';
import CarsApi from '../Api/cars.api';

export default function useCarsController() {
    const { open, close } = useLoader();


    async function carsByModel(make: Record<'make', string>) {
        try {
            open()

            const { data } = await CarsApi.carsByModel(make)

            return data
        } finally {
            close()
        }

    }

    async function randomCars() {
        try {
            open()

            const { data } = await CarsApi.randomCars()

            return data
        } finally {
            close()
        }

    }

    return {
        carsByModel,
        randomCars
    }
}