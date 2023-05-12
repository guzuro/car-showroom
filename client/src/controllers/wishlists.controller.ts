import { useLoader } from '../composables/useLoader';
import WishListsApi from '../Api/wishlists.api';
import WishApi from '../Api/wish.api'
import { useUserStore } from '../stores/userStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useNotification } from '../composables/useNotification';
import type { CarInfo } from '../types/CarInfo.type';

export default function useWishlistsController() {
    const { open, close } = useLoader();
    const { success } = useNotification()

    const userStore = useUserStore()
    const { addToWishes, replaceExistedWishlist } = useWishlistStore()

    async function createListHandler(name: string) {
        try {
            open()

            const { data } = await WishListsApi.createWishlist({
                userId: userStore.user.id,
                name
            })

            success(data.message)
            addToWishes(data.wishlist)

        } finally {
            close()
        }
    }

    async function removeListHandler() {
        try {
            open()

            // const { data } = await CarsApi.randomCars()

            // return data
        } finally {
            close()
        }

    }

    async function addToWishListHandler(listId: number, car: CarInfo) {
        try {
            const { index, make, ...otherFields } = car

            open()

            const { data } = await WishApi.addToWishList({
                listId,
                carModel: make,
                carIndex: index,
                carInfo: otherFields
            })

            success(data.message)

            replaceExistedWishlist(data.wishlist)
        } finally {
            close()
        }
    }

    async function deleteFromWishlistHandler(listId: number, id: number) {
        open()

        try {
            const { data } = await WishApi.removeFromWishList(id, { listId })
            success(data.message)

            replaceExistedWishlist(data.wishlist)
        } finally {
            close()
        }
    }

    return {
        createListHandler,
        removeListHandler,
        addToWishListHandler,
        deleteFromWishlistHandler

    }
}