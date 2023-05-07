<template>
  <ul class="cars-list">
    <li v-for="(car, index) in cars" :key="index">
      <cars-list-item :car="car" @bookmark-click="addToWishlist" />
      {{ car }}
    </li>

    <auth-modal v-model="authModalOpen" />
    <wishlist-create-modal v-model="wishlistCreateModalOpen" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import { useThemeVars } from 'naive-ui'
import CarsListItem from './CarsListItem.vue'
import type { CarInfo } from '../../types/CarInfo.type'
import AuthModal from './../AuthModal.vue'
import { useWishlistStore } from '../../stores/wishlistStore'
import WishlistCreateModal from '../WishlistCreateModal.vue'
import { WishlistAddFrontendActions } from '../../types/Wishlist.type'

export default defineComponent({
  components: {
    CarsListItem,
    AuthModal,
    WishlistCreateModal
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

    async function addToWishlist(car: CarInfo) {
      try {
        await wishlistStore.addToWishlist(car)
      } catch (e: unknown) {
        if (!(e instanceof Error)) {
          if (e === WishlistAddFrontendActions.NEED_AUTH) {
            authModalOpen.value = true
          } else if (e === WishlistAddFrontendActions.WISHLIST_EMPTY) {
            wishlistCreateModalOpen.value = true
          }
        }
      }
    }

    return {
      warningColor,
      warningColorHover,
      addToWishlist,
      authModalOpen,
      wishlistCreateModalOpen
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';

.cars-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  li {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 100%;

    @media (min-width: $md) {
      flex-basis: 50%;
    }

    @media (min-width: $lg) {
      flex-basis: 33.33333%;
    }

    @media (min-width: $xl) {
      flex-basis: 20%;
    }
  }
}
</style>
