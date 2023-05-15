<template>
  <div class="not-found-page">
    <n-result
      status="404"
      title="404 Not Found"
      description="This page doesn`t exists. Try again from the start"
    >
      <template #footer>
        <n-button @click="push({ name: 'Catalog' })">Main page</n-button>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts">
import { NResult, NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    NResult,
    NButton
  },
  setup() {
    const { push } = useRouter()
    return {
      push
    }
  }
})
</script>

<style scoped lang="scss">
.not-found-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
