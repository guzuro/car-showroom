import { defineStore } from "pinia"
import { ref } from "vue"
import { WishlistAddFrontendActions, type Wishlist } from "../types/Wishlist.type"
import { useUserStore } from "./userStore"
import { useNotification } from "../composables/useNotification"
import WishListsApi from '../Api/wishlists.api'
import type { CarInfo } from "../types/CarInfo.type"

export const useWishlistStore = defineStore('wishlists', () => {
    const wishes = ref<Array<Wishlist>>([])
    const userStore = useUserStore()
    const { error, success } = useNotification()

    function setWishesToStore(payload: Array<Wishlist>) {
        wishes.value = payload
    }

    function addToWishes(payload: Wishlist) {
        wishes.value.push(payload)
    }

    async function addToWishlist(car: CarInfo) {
        if (!userStore.user) {
            error('Sign in to add to wishlist')

            throw WishlistAddFrontendActions.NEED_AUTH
        } else if (wishes.value && !wishes.value.length) {
            throw WishlistAddFrontendActions.WISHLIST_EMPTY
            // eslint-disable-next-line no-constant-condition
        } else if (false) {
            console.log('implement logic with list select');
        } else {
            console.log("IMPLENEBT ADD TO LIST");
        }
    }


    async function createWishlist(payload: any) {
        try {

            const { data } = await WishListsApi.createWishlist({
                userId: userStore.user.id,
                name: payload
            })

            success(data.message)
            addToWishes(data.wishlist)

            return data.wishlist
        } catch (error) {
            console.log(error);
        }

    }

    function deleteWishlist(payload: any) {
        console.log("implement deleteWishlist");
    }


    return {
        wishes,
        setWishesToStore,
        createWishlist,
        deleteWishlist,
        addToWishlist
    }
})
