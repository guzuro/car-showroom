<template>
  <div class="cars-list-wrapper">
    <n-grid class="cars-list" :x-gap="24" :y-gap="24" cols="1 s:2 m:3 l:4" responsive="screen">
      <n-grid-item v-for="(car, index) in cars" :key="index">
        <cars-list-item :car="car" @bookmark-click="addToWishlist" />
        {{ car }}
      </n-grid-item>
    </n-grid>

    <auth-modal v-model="authModalOpen" />
    <wishlist-create-modal v-model="wishlistCreateModalOpen" />
    <select-list-modal ref="selectWishModalRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import { NGrid, NGridItem, useThemeVars } from 'naive-ui'
import CarsListItem from './CarsListItem.vue'
import type { CarInfo } from '../../types/CarInfo.type'
import AuthModal from './../AuthModal.vue'
import { useWishlistStore } from '../../stores/wishlistStore'
import WishlistCreateModal from '../WishlistCreateModal.vue'
import SelectListModal from '../SelectListModal.vue'
import { storeToRefs } from 'pinia'
import useWishlistsController from '../../controllers/wishlists.controller'
import { useNotification } from '../../composables/useNotification'
import { useUserStore } from '../../stores/userStore'

export default defineComponent({
  components: {
    CarsListItem,
    AuthModal,
    WishlistCreateModal,
    SelectListModal,
    NGrid,
    NGridItem
  },
  props: {
    cars: {
      type: Array as PropType<Array<CarInfo>>,
      required: true,
      default: () => []
    }
  },

  setup() {
    const theme = useThemeVars()
    const { warningColor, warningColorHover } = theme.value
    const { error } = useNotification()

    const userStore = useUserStore()
    const wishListStore = useWishlistStore()
    const { wishes, firstListIfLengthOne, defaultList } = storeToRefs(wishListStore)

    const { addToWishListHandler, deleteFromWishlistHandler } = useWishlistsController()

    const authModalOpen = ref(false)
    const wishlistCreateModalOpen = ref(false)
    const selectWishModalRef = ref<any>(null)

    async function addToWishlist(car: CarInfo) {
      if (!userStore.user) {
        error('Sign in to add to wishlist')

        authModalOpen.value = true
      } else if (wishes.value && !wishes.value.length) {
        wishlistCreateModalOpen.value = true
      } else if (firstListIfLengthOne.value) {
        checkCarIsInList(firstListIfLengthOne.value.id, car)
      } else if (defaultList.value) {
        checkCarIsInList(defaultList.value.id, car)
      } else {
        selectWishModalRef.value.openDialog().then((value: number) => {
          checkCarIsInList(value, car)
        })
      }
    }

    async function checkCarIsInList(listId: number, car: CarInfo) {
      const isInList = wishListStore.isCarInList(car)

      if (isInList) {
        deleteFromWishlistHandler(listId, isInList.id)
      } else {
        addToWishListHandler(listId, car)
      }
    }

    return {
      warningColor,
      warningColorHover,
      addToWishlist,
      authModalOpen,
      wishlistCreateModalOpen,
      NGrid,
      NGridItem,
      selectWishModalRef
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';
</style>
