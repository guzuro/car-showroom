<template>
  <div class="car-catalog">
    <models-list @select-model="getMake" />

    <cars-list :cars="cars" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useCarsController from '../controllers/cars.controller'
// import carApi from '../Api/car.api';
import ModelsList from '../components/ModelsList.vue'
import CarsList from '../components/CarsList.vue'

export default defineComponent({
  components: {
    ModelsList,
    CarsList
  },
  setup() {
    const { carsByModel, randomCars } = useCarsController()
    const cars = ref([])

    async function getMake(model: string) {
      cars.value = await carsByModel({ make: model })
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

<style scoped></style>