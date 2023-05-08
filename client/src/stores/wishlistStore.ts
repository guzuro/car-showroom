import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { WishlistAddFrontendActions, type Wishlist } from "../types/Wishlist.type"
import { useUserStore } from "./userStore"
import { useNotification } from "../composables/useNotification"
import WishListsApi from '../Api/wishlists.api'
import WishApi from '../Api/wish.api'
import type { CarInfo } from "../types/CarInfo.type"
import type { CarModel } from "../components/CarModels/types"
import { useLoader } from "../composables/useLoader"

export const useWishlistStore = defineStore('wishlists', () => {
    const wishes = ref<Array<Wishlist>>([])
    const userStore = useUserStore()
    const { error, success } = useNotification()
    const { open, close } = useLoader()

    const firstListIfLengthOne = computed(() => {
        if (wishes.value.length === 1) return wishes.value[0].id
        return false
    })

    const defaultList = computed(() => {
        return wishes.value.find(w => w.isDefault)?.id;
    })

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
        } else if (firstListIfLengthOne.value) {
            addWishToList(firstListIfLengthOne.value, car.make, car.index)
        } else if (defaultList.value) {
            addWishToList(defaultList.value, car.make, car.index)
        } else {
            throw WishlistAddFrontendActions.SELECT_WISHLIST_TO_ADD
        }
    }

    async function addWishToList(listId: number, carModel: CarModel, carIndex: number) {
        try {
            open()
            const { data } = await WishApi.addToWishList({
                listId,
                carModel,
                carIndex,
            })

            success(data.message)

            updateListItem(data.wishlist)
        } finally {
            close()
        }
    }

    function updateListItem(newList: Wishlist) {
        const idx = wishes.value.findIndex(w => w.id === newList.id)
        console.log(wishes.value.splice(idx, 1, newList), 'wishes.value.splice(idx, 1, newList)');

        wishes.value = wishes.value.splice(idx, 1, newList)
    }

    async function createWishlist(payload: any) {
        try {
            open()

            const { data } = await WishListsApi.createWishlist({
                userId: userStore.user.id,
                name: payload
            })

            success(data.message)
            addToWishes(data.wishlist)

            return data.wishlist
        } finally {
            close()
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
        addToWishlist,
        addWishToList,
    }
})
