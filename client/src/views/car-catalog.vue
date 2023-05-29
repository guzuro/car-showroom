<template>
  <div class="car-catalog">
    <models-list @select-model="getMake" />

    <car-list-filters />

    <cars-list class="car-catalog__cars" :cars="cars" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import useCarsController from '../controllers/cars.controller'
import ModelsList from '../components/CarModels/ModelsList.vue'
import CarsList from '../components/CarsList/CarsList.vue'
import type { CarInfo } from '../types/CarInfo.type'
import type { ModelItem } from '../components/CarModels/types'
import { useRoute } from 'vue-router'
import CarListFilters from '../components/CarListFilters.vue'
import { useCars } from '../composables/useCars'

export default defineComponent({
  components: {
    ModelsList,
    CarsList,
    CarListFilters
  },
  setup() {
    const { getCars, randomCars } = useCarsController()
    const cars = ref<Array<CarInfo>>([])
    const route = useRoute()
    const { updateCarsGetQuery } = useCars()

    watchEffect(async () => {
      const { query, name } = route

      if (name === 'Catalog') {
        if (query.make || query.year || query.transmission || query.fuel) {
          cars.value = await getCars({ ...query })
        } else {
          getRandomCars()
        }
      }
    })

    async function getMake(model: ModelItem['value'] | null) {
      updateCarsGetQuery(model, 'make')
    }

    async function getRandomCars() {
      cars.value = await randomCars()
    }

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
    margin-top: 30px;
  }
}
</style>
