<template>
  <div
    class="layout-header-wishes"
    v-if="wishes.length"
    @click="push({ name: 'UsersWishes' })"
  >
    <n-badge :value="wishes.length">
      <n-icon :size="30">
        <format-list-bulleted-filled />
      </n-icon>
    </n-badge>
  </div>
</template>

<script lang="ts">
import { FormatListBulletedFilled } from '@vicons/material'
import { NBadge, NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { useWishlistStore } from '../../stores/wishlistStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    NIcon,
    NBadge,
    FormatListBulletedFilled
  },
  setup() {
    const wishListStore = useWishlistStore()
    const { wishes } = storeToRefs(wishListStore)
    const { push } = useRouter()

    return {
      wishes,
      push
    }
  }
})
</script>

<style scoped lang="scss">
.layout-header-wishes {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}
</style>
