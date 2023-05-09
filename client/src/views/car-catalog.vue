<template>
  <div class="car-catalog">
    <models-list @select-model="getMake" />

    <cars-list class="car-catalog__cars" :cars="cars" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import useCarsController from '../controllers/cars.controller'
import ModelsList from '../components/CarModels/ModelsList.vue'
import CarsList from '../components/CarsList/CarsList.vue'
import type { CarInfo } from '../types/CarInfo.type'
import type { ModelItem } from '../components/CarModels/types'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ModelsList,
    CarsList
  },
  setup() {
    const { carsByModel, randomCars } = useCarsController()
    const cars = ref<Array<CarInfo>>([])
    const route = useRoute()
    const { replace } = useRouter()

    watchEffect(async () => {
      const query = route.query

      if (query['make']) {
        cars.value = await carsByModel({ limit: 10, ...query })
      } else {
        getRandomCars()
      }
    })

    async function getMake(model?: ModelItem['value']) {
      replace({
        query: {
          make: model?.toString()
        }
      })
    }

    async function getRandomCars() {
      cars.value = await randomCars()
    }

    onMounted(() => {
      getRandomCars()
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
