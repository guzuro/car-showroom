<template>
  <div class="users-wishlists">
    <wishlist-create-modal v-model="wishlistCreateModalOpen" />

    <n-grid
      :x-gap="12"
      :y-gap="12"
      item-responsive
      responsive="screen"
    >
      <n-grid-item span="24 s:7">
        <n-button
          type="primary"
          class="users-wishlists__add-btn"
          @click="wishlistCreateModalOpen = true"
        >
          <template #icon>
            <n-icon>
              <plus-filled />
            </n-icon>
          </template>
          Add new
        </n-button>
        <wish-list-names
          v-if="screen.s"
          @on-list-select="activeListId = $event"
        />

        <n-dropdown
          v-if="!screen.s"
          trigger="click"
          :options="wishlistSelectOptions"
          key-field="value"
          @select="activeListId = $event"
        >
          <n-button>
            <template #icon>
              <n-icon>
                <menu-round />
              </n-icon>
            </template>
            Show
          </n-button>
        </n-dropdown>
      </n-grid-item>

      <n-grid-item span="24 s:17">
        <template v-if="activeListId && activeWishlist">
          <wishlist-toolbar :list="activeWishlist" />

          <n-grid
            v-if="activeWishlist && activeWishlist.items.length"
            :x-gap="12"
            :y-gap="12"
            cols="1 s:2 m:3 l:4"
            responsive="screen"
          >
            <n-grid-item
              v-for="item in activeWishlist.items"
              :key="item.id"
            >
              <cars-list-item
                delete-icon
                :car="item.carInfo"
                @delete-click="handleDeleteClick(item.id)"
              />
            </n-grid-item>
          </n-grid>
          <n-empty
            v-else
            description="List is empty"
          />
        </template>
        <n-empty
          v-else
          description="List is not selected"
        />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { NGrid, NGridItem, NEmpty, NDropdown, NIcon, NButton } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import WishListNames from '../components/WishListNames.vue'
import CarsListItem from '../components/CarsList/CarsListItem.vue'
import useWishlistsController from '../controllers/wishlists.controller'
import { useWishlistStore } from '../stores/wishlistStore'
import WishlistToolbar from '../components/WishlistToolbar.vue'
import { MenuRound, PlusFilled } from '@vicons/material'
import { useMediaBreakpoints } from '../composables/useMediaBreakpoints'
import WishlistCreateModal from '../components/WishlistCreateModal.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    NGrid,
    NGridItem,
    WishListNames,
    CarsListItem,
    NEmpty,
    WishlistToolbar,
    NDropdown,
    NIcon,
    MenuRound,
    NButton,
    PlusFilled,
    WishlistCreateModal
  },
  setup() {
    const { deleteFromWishlistHandler } = useWishlistsController()
    const store = useWishlistStore()
    const { wishlistSelectOptions } = storeToRefs(store)
    const activeListId = ref<null | number>(null)
    const { screen } = useMediaBreakpoints()
    const wishlistCreateModalOpen = ref(false)

    const activeWishlist = computed(() => {
      if (activeListId.value) {
        return store.wishes.find((w) => w.id === activeListId.value)
      }

      return null
    })

    function handleDeleteClick(itemId: number) {
      if (activeListId.value) {
        deleteFromWishlistHandler(activeListId.value, itemId)
      }
    }

    return {
      activeListId,
      handleDeleteClick,
      activeWishlist,
      wishlistSelectOptions,
      screen,
      wishlistCreateModalOpen
    }
  }
})
</script>

<style scoped lang="scss">
.users-wishlists {
  &__add-btn {
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
