<template>
  <div class="layout-user-header">
    <div class="layout-user-header__user" v-if="user">
      {{ userFullName }}
      <n-icon :size="30">
        <person-filled />
      </n-icon>
    </div>
    <div v-else class="layout-user-header__auth" @click="authModalOpen = true">
      Sign in
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
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AuthModal from './AuthModal.vue'

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
      authModalOpen
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
