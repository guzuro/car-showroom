<template>
  <div class="layout-header-wrapper">
    <div class="layout-header">
      <div
        class="layout-header__app-name"
        @click="gotoMainPage"
      >
        <img
          class="layout-header__logo"
          :src="logo"
        />
        <div class="layout-header__title header-title">
          <span class="header-title__top"> Car </span>
          <span class="header-title__bottom"> Stories </span>
        </div>
      </div>
      <div class="layout-header__actions">
        <layout-header-wishes />
        <layout-header-user />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeaderUser from './LayoutHeaderUser.vue'
import LayoutHeaderWishes from './LayoutHeaderWishes.vue'
import logo from '../../assets/image/logo.svg'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    LayoutHeaderUser,
    LayoutHeaderWishes
  },
  setup() {
    const { push } = useRouter()

    function gotoMainPage() {
      push({
        name: 'Catalog'
      })
    }

    return {
      logo,
      gotoMainPage
    }
  }
})
</script>

<style scoped lang="scss">
.layout-header {
  display: flex;
  justify-content: space-between;
  padding: 25px;

  &__actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__app-name {
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }

  &__logo {
    width: 100%;
    height: 40px;
  }

  &__title {
    line-height: 16px;
  }

  &__user {
    display: flex;
    align-items: c;
  }

  .header-title {
    &__top {
      text-transform: uppercase;
    }
  }
}
</style>
