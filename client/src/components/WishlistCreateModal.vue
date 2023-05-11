<template>
  <n-modal
    title="Add new wishlist"
    style="width: 600px"
    preset="card"
    class="wishlist-create-modal"
    v-model:show="createModal"
  >
    <n-input
      v-model:value="listName"
      class="wishlist-create-modal__input"
      placeholder="List name..."
    />
    <div class="wishlist-create-modal__button-add">
      <n-button type="success" @click="addNewList"> Create </n-button>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { NInput, NModal, NButton } from 'naive-ui'
import { computed, defineComponent, toRefs, unref, ref } from 'vue'
import useWishlistsController from '../controllers/wishlists.controller'

export default defineComponent({
  components: {
    NModal,
    NInput,
    NButton
  },
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { createListHandler } = useWishlistsController()

    const { modelValue } = toRefs(props)
    const listName = ref('')

    const createModal = computed({
      get() {
        return unref(modelValue)
      },
      set(newValue: boolean) {
        emit('update:modelValue', newValue)
      }
    })

    async function addNewList() {
      try {
        await createListHandler(listName.value)
        createModal.value = false
      } finally {
        listName.value = ''
      }
    }

    return {
      createModal,
      listName,
      addNewList
    }
  }
})
</script>

<style scoped lang="scss">
.wishlist-create-modal {
  &__button-add {
    text-align: right;
    margin-top: 15px;
  }
}
</style>
