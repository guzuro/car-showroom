<template>
  <div class="wishlist-toolbar">
    <n-page-header>
      <template #title>
        <n-space>
          <n-icon
            v-if="list.shareKey"
            class="wishlist-toolbar__link"
            :color="primaryColor"
            :size="30"
            @click="prepareShareLink(list.shareKey)"
          >
            <link-filled />
          </n-icon>
          {{ list.name }}
        </n-space>
      </template>

      <template #extra>
        <n-space>
          <n-button @click="toggleDefault"> {{ defaultToggleButtonTitle }} </n-button>
          <n-button
            v-if="!list.shareKey"
            type="success"
            @click="generateShareLink"
          >
            Generate link
          </n-button>
          <n-button
            type="error"
            @click="removeListHandler(list.id)"
            >Remove list</n-button
          >
        </n-space>
      </template>
    </n-page-header>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { Wishlist } from '../types/Wishlist.type'
import useWishlistsController from '../controllers/wishlists.controller'
import { NButton, NIcon, NPageHeader, NSpace, useThemeVars } from 'naive-ui'
import { LinkFilled } from '@vicons/material'
import { prepareShareLink } from '../utils/prepareShareLink'

export default defineComponent({
  components: {
    NButton,
    NSpace,
    NPageHeader,
    NIcon,
    LinkFilled
  },
  props: {
    list: {
      required: true,
      type: Object as PropType<Wishlist>
    }
  },
  setup(props) {
    const { removeListHandler, generateShareKey, toggleWishlistDefault } = useWishlistsController()
    const theme = useThemeVars()
    const { primaryColor } = theme.value

    const defaultToggleButtonTitle = computed(() => {
      if (props.list.isDefault) {
        return 'Unset default'
      } else {
        return 'Make default'
      }
    })

    function generateShareLink() {
      generateShareKey(props.list.id)
    }

    function toggleDefault() {
      toggleWishlistDefault(props.list.id)
    }

    return {
      removeListHandler,
      generateShareLink,
      primaryColor,
      prepareShareLink,
      toggleDefault,
      defaultToggleButtonTitle
    }
  }
})
</script>

<style scoped lang="scss">
.wishlist-toolbar {
  margin-bottom: 15px;

  &__title {
    display: flex;
    align-items: center;
  }

  &__link {
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
