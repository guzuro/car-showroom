<template>
  <div class="users-wishlists">
    <n-page-header title="Your lists">
      <template #extra>
        <n-button @click="wishlistCreateModalOpen = true">Add new</n-button>
      </template>
    </n-page-header>

    <n-collapse>
      <n-collapse-item v-for="list in wishes" :key="list.id" :title="list.name">
        {{ list.items }}
      </n-collapse-item>
    </n-collapse>

    <wishlist-create-modal v-model="wishlistCreateModalOpen" />
  </div>
</template>

<script lang="ts">
import { NButton, NCollapse, NCollapseItem, NPageHeader } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'
import WishlistCreateModal from '../components/WishlistCreateModal.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    NCollapse,
    NCollapseItem,
    NPageHeader,
    NButton,
    WishlistCreateModal
  },
  setup() {
    const state = useWishlistStore()
    const { wishes } = storeToRefs(state)
    const wishlistCreateModalOpen = ref(false)

    return {
      wishes,
      wishlistCreateModalOpen
    }
  }
})
</script>

<style scoped></style>
