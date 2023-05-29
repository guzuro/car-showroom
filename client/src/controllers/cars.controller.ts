import { useLoader } from '../composables/useLoader';
import CarsApi from '../Api/cars.api';

export default function useCarsController() {
    const { open, close } = useLoader();


    async function getCars(query: Record<string, any>) {
        try {
            open()

            const { data } = await CarsApi.getCars(query)

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
        getCars,
        randomCars
    }
}