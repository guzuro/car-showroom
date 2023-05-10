import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { WishlistAddFrontendActions, type Wishlist } from "../types/Wishlist.type"
import { useUserStore } from "./userStore"
import { useNotification } from "../composables/useNotification"
import WishListsApi from '../Api/wishlists.api'
import WishApi from '../Api/wish.api'
import type { CarInfo } from "../types/CarInfo.type"
import { useLoader } from "../composables/useLoader"
import wishApi from "../Api/wish.api"
import type { Wish } from "../types/Wish.type"

export const useWishlistStore = defineStore('wishlists', () => {
    const wishes = ref<Array<Wishlist>>([])
    const userStore = useUserStore()
    const { success, error } = useNotification()
    const { open, close } = useLoader()

    const firstListIfLengthOne = computed(() => {
        if (wishes.value.length === 1) return wishes.value[0]
        return false
    })

    const defaultList = computed(() => wishes.value.find(w => w.isDefault))

    function setWishesToStore(payload: Array<Wishlist>) {
        wishes.value = payload
    }

    function addToWishes(payload: Wishlist) {
        wishes.value.push(payload)
    }

    const wishlistSelectOptions = computed(() => {
        return wishes.value.map(w => ({ label: w.name, value: w.id }))
    })

    function replaceExistedWishlist(newList: Wishlist) {
        const idx = wishes.value.findIndex(w => w.id === newList.id)

        wishes.value.splice(idx, 1, newList)
    }

    function isCarInList(car: CarInfo) {
        const checkCallback = (wishItem: Wish) =>
            wishItem.carIndex === car.index && wishItem.carModel === car.make

        if (firstListIfLengthOne.value) {
            return firstListIfLengthOne.value.items.find(checkCallback)
        } else if (defaultList.value) {
            return defaultList.value.items.find(checkCallback)
        } else {
            return undefined
        }
    }

    async function handleAddingToWishlist(car: CarInfo) {
        if (!userStore.user) {
            error('Sign in to add to wishlist')

            throw WishlistAddFrontendActions.NEED_AUTH
        } else if (wishes.value && !wishes.value.length) {
            throw WishlistAddFrontendActions.WISHLIST_EMPTY
        } else if (firstListIfLengthOne.value) {
            checkCarIsInList(firstListIfLengthOne.value.id, car)
        } else if (defaultList.value) {
            checkCarIsInList(defaultList.value.id, car)
        } else {
            throw WishlistAddFrontendActions.SELECT_WISHLIST_TO_ADD
        }
    }

    async function checkCarIsInList(listId: number, car: CarInfo) {
        const isInList = isCarInList(car)

        if (isInList) {
            deleteFromWishlist(isInList.id, listId)
        } else {
            addToWishList(listId, car)
        }
    }

    // api

    async function addToWishList(listId: number, car: CarInfo) {
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

    async function deleteFromWishlist(id: number, listId: number) {
        open()

        try {
            const { data } = await wishApi.removeFromWishList({ id }, { listId })
            success(data.message)

            replaceExistedWishlist(data.wishlist)
        } finally {
            close()
        }
    }


    return {
        wishes,
        setWishesToStore,
        createWishlist,
        deleteFromWishlist,
        handleAddingToWishlist,
        checkCarIsInList,
        isCarInList,
        wishlistSelectOptions
    }
})
