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
    <select-list-modal v-model="selectWishlistModalOpen" />
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
import { WishlistAddFrontendActions } from '../../types/Wishlist.type'

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

    const wishlistStore = useWishlistStore()
    const authModalOpen = ref(false)
    const wishlistCreateModalOpen = ref(false)
    const selectWishlistModalOpen = ref(false)

    async function addToWishlist(car: CarInfo) {
      try {
        await wishlistStore.handleAddingToWishlist(car)
      } catch (e: unknown) {
        if (!(e instanceof Error)) {
          if (e === WishlistAddFrontendActions.NEED_AUTH) {
            authModalOpen.value = true
          } else if (e === WishlistAddFrontendActions.WISHLIST_EMPTY) {
            wishlistCreateModalOpen.value = true
          } else if (e === WishlistAddFrontendActions.SELECT_WISHLIST_TO_ADD) {
            selectWishlistModalOpen.value = true
          }
        }
      }
    }

    return {
      warningColor,
      warningColorHover,
      addToWishlist,
      authModalOpen,
      wishlistCreateModalOpen,
      selectWishlistModalOpen,
      NGrid,
      NGridItem
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';
</style>
