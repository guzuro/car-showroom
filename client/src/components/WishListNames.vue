<template>
  <n-list class="wish-list-names" hoverable clickable>
    <wishlist-create-modal v-model="wishlistCreateModalOpen" />
    <n-button
      type="primary"
      class="wish-list-names__add-btn"
      @click="wishlistCreateModalOpen = true"
    >
      <template #icon>
        <n-icon>
          <plus-filled />
        </n-icon>
      </template>
      Add new
    </n-button>

    <template v-if="wishes.length">
      <n-list-item
        v-for="list in wishes"
        :key="list.id"
        class="wish-list-names__item"
        :class="{ 'wish-list-names__item-active': list.id === selectedListId }"
        @click="selectList(list)"
      >
        <n-thing :title="list.name" />
      </n-list-item>
    </template>
  </n-list>
</template>

<script lang="ts">
import { NButton, NIcon, NList, NListItem, NThing, useThemeVars } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '../stores/wishlistStore'
import type { Wishlist } from '../types/Wishlist.type'
import WishlistCreateModal from '../components/WishlistCreateModal.vue'
import { PlusFilled } from '@vicons/material'

export default defineComponent({
  components: {
    NList,
    NListItem,
    WishlistCreateModal,
    NThing,
    NButton,
    NIcon,
    PlusFilled
  },
  emits: ['onListSelect'],
  setup(props, { emit }) {
    const state = useWishlistStore()
    const { wishes } = storeToRefs(state)

    const theme = useThemeVars()
    const { primaryColor } = theme.value

    const selectedListId = ref<number | null>(null)
    const wishlistCreateModalOpen = ref(false)

    function selectList(list: Wishlist) {
      if (selectedListId.value === list.id) {
        selectedListId.value = null
        emit('onListSelect', null)
      } else {
        selectedListId.value = list.id
        emit('onListSelect', list.id)
      }
    }

    return {
      wishes,
      selectList,
      selectedListId,
      primaryColor,
      wishlistCreateModalOpen
    }
  }
})
</script>

<style scoped lang="scss">
.wish-list-names {
  &__item {
    border: 1px transparent solid;

    &-active {
      border: 1px v-bind(primaryColor) solid;
    }
  }

  &__add-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
