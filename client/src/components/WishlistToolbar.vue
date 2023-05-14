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
          <n-button v-if="!list.shareKey" type="success" @click="generateShareLink">
            Generate link
          </n-button>
          <n-button type="error" @click="removeListHandler(list.id)">Remove list</n-button>
        </n-space>
      </template>
    </n-page-header>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
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
    const { removeListHandler, generateShareKey } = useWishlistsController()
    const theme = useThemeVars()
    const { primaryColor } = theme.value

    function generateShareLink() {
      generateShareKey(props.list.id)
    }

    return {
      removeListHandler,
      generateShareLink,
      primaryColor,
      prepareShareLink
    }
  }
})
</script>

<style scoped lang="scss">
.wishlist-toolbar {
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
