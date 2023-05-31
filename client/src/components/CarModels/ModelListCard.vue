<template>
  <div class="model-list-card">
    <img
      :src="model.img"
      :alt="model.value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ModelItem } from './types'

export default defineComponent({
  props: {
    model: {
      type: Object as PropType<ModelItem>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.model-list-card {
  width: 250px;
  height: 120px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;

  img {
    width: inherit;
    height: inherit;
    transition: 0.3s;

    &:hover {
      transform: scale(1.4);
      opacity: 0.7;
    }
  }
}
</style>
