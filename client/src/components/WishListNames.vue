<template>
  <n-list class="wish-list-names" hoverable clickable>
    <template v-if="sortedWishes.length">
      <n-list-item
        v-for="list in sortedWishes"
        :key="list.id"
        class="wish-list-names__item"
        :class="{ 'wish-list-names__item-active': list.id === selectedListId }"
        @click="selectList(list)"
      >
        <n-thing :title="list.name">
          <template #header-extra>
            <template v-if="list.isDefault">
              <n-icon :color="errorColor" :size="30">
                <star-filled />
              </n-icon>
            </template>
            <template v-if="list.shareKey">
              <n-icon :color="primaryColor" :size="30">
                <link-filled />
              </n-icon>
            </template>
          </template>
        </n-thing>
      </n-list-item>
    </template>
  </n-list>
</template>

<script lang="ts">
import { NIcon, NList, NListItem, NThing, useThemeVars } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '../stores/wishlistStore'
import type { Wishlist } from '../types/Wishlist.type'
import { StarFilled, LinkFilled } from '@vicons/material'

export default defineComponent({
  components: {
    NList,
    NListItem,
    NThing,
    NIcon,
    StarFilled,
    LinkFilled
  },
  emits: ['onListSelect'],
  setup(props, { emit }) {
    const state = useWishlistStore()
    const { sortedWishes } = storeToRefs(state)

    const theme = useThemeVars()
    const { primaryColor, errorColor } = theme.value

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
      sortedWishes,
      selectList,
      selectedListId,
      primaryColor,
      errorColor,
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
}
</style>
