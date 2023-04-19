<template>
  <div class="car-catalog">
    <models-list @select-model="getMake" />

    <cars-list class="car-catalog__cars" :cars="cars" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useCarsController from '../controllers/cars.controller'
import ModelsList from '../components/CarModels/ModelsList.vue'
import CarsList from '../components/CarsList.vue'
import type { CarInfo } from '../types/CarInfo.type'
import type { ModelItem } from '../components/CarModels/types'

export default defineComponent({
  components: {
    ModelsList,
    CarsList
  },
  setup() {
    const { carsByModel, randomCars } = useCarsController()
    const cars = ref<Array<CarInfo>>([])

    async function getMake(model: ModelItem['value']) {
      cars.value = await carsByModel({ make: model, limit: 10 })
    }

    onMounted(async () => {
      cars.value = await randomCars();
    })

    return {
      getMake,
      cars
    }
  }
})
</script>

<style scoped lang="scss">
.car-catalog {
  &__cars {
    margin-top: 60px;
  }
}
</style>