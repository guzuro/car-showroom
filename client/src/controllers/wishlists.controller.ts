import { useLoader } from '../composables/useLoader';
import CarsApi from '../Api/cars.api';

export default function useCarsController() {
    const { open, close } = useLoader();


    async function addWishlist(query: Record<string, any>) {
        try {
            open()

            const { data } = await CarsApi.carsByModel(query)

            return data
        } finally {
            close()
        }
    }

    async function getWishlists() {
        try {
            open()

            const { data } = await CarsApi.randomCars()

            return data
        } finally {
            close()
        }

    }

    async function removeWishlist() {
        try {
            open()

            const { data } = await CarsApi.randomCars()

            return data
        } finally {
            close()
        }

    }

    return {
        addWishlist,
        getWishlists,
        removeWishlist
    }
}