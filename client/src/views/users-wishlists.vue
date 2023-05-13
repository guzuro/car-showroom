<template>
  <div class="users-wishlists">
    <n-page-header title="Your lists" />

    <n-grid :x-gap="12" :y-gap="12" item-responsive responsive="screen">
      <n-grid-item span="24 m:5">
        <wish-list-names @on-list-select="activeListId = $event" />
      </n-grid-item>

      <n-grid-item span="24 m:19">
        <template v-if="activeListId">
          <n-grid
            v-if="wishlistItems && wishlistItems.length"
            :x-gap="12"
            :y-gap="12"
            cols="1 s:2 m:3 l:4"
            responsive="screen"
          >
            <n-grid-item v-for="item in wishlistItems" :key="item.id">
              <cars-list-item
                delete-icon
                :car="item.carInfo"
                @delete-click="handleDeleteClick(item.id)"
              />
            </n-grid-item>
          </n-grid>
          <n-empty v-else description="List is empty" />
        </template>
        <n-empty v-else description="List is not selected" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { NPageHeader, NGrid, NGridItem, NEmpty } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import WishListNames from '../components/WishListNames.vue'
import CarsListItem from '../components/CarsList/CarsListItem.vue'
import useWishlistsController from '../controllers/wishlists.controller'
import { useWishlistStore } from '../stores/wishlistStore'

export default defineComponent({
  components: {
    NGrid,
    NGridItem,
    NPageHeader,
    WishListNames,
    CarsListItem,
    NEmpty
  },
  setup() {
    const { deleteFromWishlistHandler } = useWishlistsController()
    const store = useWishlistStore()
    const activeListId = ref<null | number>(null)

    const wishlistItems = computed(() => {
      if (activeListId.value) {
        return store.wishes.find((w) => w.id === activeListId.value)?.items
      }

      return false
    })

    function handleDeleteClick(itemId: number) {
      if (activeListId.value) {
        deleteFromWishlistHandler(activeListId.value, itemId)
      }
    }

    return {
      activeListId,
      handleDeleteClick,
      wishlistItems
    }
  }
})
</script>

<style scoped></style>
