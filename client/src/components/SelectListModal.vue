<template>
  <n-modal
    title="Select list"
    style="width: 600px"
    preset="card"
    class="wishlist-create-modal"
    v-model:show="selectListModalOpen"
  >
    <n-select
      :options="wishlistSelectOptions"
      @update:value="handleUpdateValue"
    />
  </n-modal>
</template>

<script lang="ts">
import { NModal, NSelect } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    NModal,
    NSelect
  },
  emits: ['update:modelValue', 'onListSelect'],
  setup(props, { expose }) {
    expose({ openDialog })

    const { wishlistSelectOptions } = storeToRefs(useWishlistStore())
    const selectListModalOpen = ref(false)

    let resolve: ((value: unknown) => void) | null = null

    function openDialog() {
      selectListModalOpen.value = true

      return new Promise((res) => {
        resolve = res
      })
    }

    function handleUpdateValue(listId: number) {
      if (resolve) {
        resolve(listId)

        selectListModalOpen.value = false
      }
    }

    return {
      wishlistSelectOptions,
      handleUpdateValue,
      selectListModalOpen
    }
  }
})
</script>

<style scoped></style>
