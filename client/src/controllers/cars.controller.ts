import { useLoader } from '../composables/useLoader';
import CarsApi from '../Api/cars.api';

export default function useCarsController() {
    const { open, close } = useLoader();


    async function carsByModel(make: Record<'make', string>) {
        try {
            open()

            const { data } = await CarsApi.carsByModel(make)

            console.log(data);

        } finally {
            close()
        }

    }

    return {
        carsByModel
    }
}