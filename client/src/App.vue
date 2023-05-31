<template>
  <app-config>
    <router-view />
  </app-config>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useLoader } from './composables/useLoader'
import AppConfig from '@/components/AppConfig.vue'

export default defineComponent({
  components: {
    RouterView,
    AppConfig
  },
  setup() {
    const { loading } = useLoader()

    return {
      loading
    }
  }
})
</script>

<style scoped lang="css">
.root-wrapper {
  min-height: 100vh;
}
</style>
