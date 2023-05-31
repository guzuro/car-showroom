<template>
  <div class="layout-user-header">
    <div
      class="layout-user-header__user"
      v-if="user"
    >
      <template v-if="screen.m">
        {{ userFullName }}
      </template>
      <n-icon :size="30">
        <person-filled />
      </n-icon>
    </div>
    <div
      v-else
      class="layout-user-header__auth"
      @click="authModalOpen = true"
    >
      <template v-if="screen.m"> Sign in </template>
      <n-icon :size="30">
        <log-in-filled />
      </n-icon>

      <auth-modal v-model="authModalOpen" />
    </div>
  </div>
</template>

<script lang="ts">
import { LogInFilled, PersonFilled } from '@vicons/material'
import { NIcon } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AuthModal from '../AuthModal.vue'
import { useMediaBreakpoints } from '../../composables/useMediaBreakpoints'

export default defineComponent({
  components: {
    NIcon,
    LogInFilled,
    PersonFilled,
    AuthModal
  },
  setup() {
    const store = useUserStore()
    const { user, userFullName } = storeToRefs(store)

    const { push } = useRouter()

    const { screen } = useMediaBreakpoints()

    const authModalOpen = ref(false)

    function gotoAuthPage() {
      push({
        name: 'SignIn'
      })
    }

    return {
      user,
      userFullName,
      gotoAuthPage,
      authModalOpen,
      screen
    }
  }
})
</script>

<style scoped lang="scss">
.layout-user-header {
  &__auth,
  &__user {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__user,
  &__auth {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
}
</style>
