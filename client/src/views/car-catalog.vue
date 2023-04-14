<template>
  <div class="car-catalog">
    <models-list @select-model="getMake" />

    <pre>
      {{ cars }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useCarsController from '../controllers/cars.controller'
// import carApi from '../Api/car.api';
import ModelsList from '../components/ModelsList.vue'

export default defineComponent({
  components: {
    ModelsList
  },
  setup() {
    const cars = ref([])
    const { carsByModel } = useCarsController()

    async function getMake(model: string) {
      cars.value = await carsByModel({ make: model })
    }

    return {
      getMake,
      cars
    }
  }
})
</script>

<style scoped></style>