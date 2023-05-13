import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { CarInfo } from "../types/CarInfo.type"
import type { Wish } from "../types/Wish.type"
import type { Wishlist } from "../types/Wishlist.type"

export const useWishlistStore = defineStore('wishlists', () => {
    const wishes = ref<Array<Wishlist>>([])

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

    function removeList(id: number) {
        wishes.value = wishes.value.filter(w => w.id !== id)
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

    return {
        isCarInList,
        wishes,
        setWishesToStore,
        wishlistSelectOptions,
        addToWishes,
        firstListIfLengthOne,
        defaultList,
        replaceExistedWishlist,
        removeList
    }
})
