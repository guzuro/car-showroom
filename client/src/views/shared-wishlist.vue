<template>
  <div class="shared-wishlist">
    <template v-if="sharedList">
      <template v-if="!user">
        <auth-modal v-model="authModalOpen" />

        <p>Want to see {{ sharedList.userInfo.email }} wishlist?</p>
        <p>Sign in or create account!</p>

        <n-button @click="authModalOpen = true">Sign in </n-button>
      </template>
      <template v-else>
        <p>Here is what {{ sharedList.userInfo.email }} realy liked!</p>
        <p>He called it "{{ sharedList.wishlist.name }}"</p>
        <n-grid class="cars-list" :x-gap="12" :y-gap="12" cols="1 s:2 m:3 l:4" responsive="screen">
          <n-grid-item v-for="(car, index) in sharedList.wishlist.items" :key="index">
            <cars-list-item :car="car.carInfo" />
          </n-grid-item>
        </n-grid>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useWishlistsController from '../controllers/wishlists.controller'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import type { SharedWishlistRes } from '../types/Wishlist.type'
import AuthModal from '../components/AuthModal.vue'
import CarsListItem from '../components/CarsList/CarsListItem.vue'
import { NButton, NGrid, NGridItem } from 'naive-ui'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    AuthModal,
    NButton,
    NGrid,
    NGridItem,
    CarsListItem
  },
  setup() {
    const { getSharedWishlist } = useWishlistsController()

    const store = useUserStore()
    const { user } = storeToRefs(store)
    const authModalOpen = ref(false)

    const { params } = useRoute()
    const shareKeyParam = params.shareKey?.toString()

    const sharedList = ref<SharedWishlistRes | null>(null)

    onMounted(async () => {
      if (shareKeyParam) {
        sharedList.value = await getSharedWishlist(shareKeyParam)
      }
    })

    return {
      user,
      sharedList,
      authModalOpen
    }
  }
})
</script>

<style scoped></style>
