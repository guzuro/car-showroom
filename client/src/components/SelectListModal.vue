<template>
  <n-modal
    title="Select list"
    style="width: 600px"
    preset="card"
    class="wishlist-create-modal"
    v-model:show="selectModal"
  >
    <n-select :options="wishlistSelectOptions" @update:value="handleUpdateValue" />
  </n-modal>
</template>

<script lang="ts">
import { NModal, NSelect } from 'naive-ui'
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'

export default defineComponent({
  components: {
    NModal,
    NSelect
  },
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'onListSelect'],
  setup(props, { emit }) {
    const { wishlistSelectOptions } = useWishlistStore()
    const { modelValue } = toRefs(props)

    const selectModal = computed({
      get() {
        return unref(modelValue)
      },
      set(newValue: boolean) {
        emit('update:modelValue', newValue)
      }
    })

    function handleUpdateValue(listId: number) {
      emit('onListSelect', listId)
    }

    return {
      wishlistSelectOptions,
      handleUpdateValue,
      selectModal
    }
  }
})
</script>

<style scoped></style>
