<template>
  <div class="carlist-filters">
    <n-button type="primary" :dashed="hasActiveFilters" @click="active = true">
      <template #icon>
        <n-icon>
          <FilterAltFilled />
        </n-icon>
      </template>

      Filters ({{ activeFiltersCount }})
    </n-button>

    <n-drawer
      v-model:show="active"
      :width="500"
      placement="right"
      :style="{
        height: '100vh'
      }"
    >
      <n-drawer-content closable title="Filters">
        <n-space vertical>
          <n-thing title="Transmission" content-indented>
            <n-select
              v-model:value="transmission"
              clearable
              :options="transmissionOptions"
              @change="onTransmissionChange"
            />
          </n-thing>
          <n-thing title="Fuel type" content-indented>
            <n-select
              clearable
              v-model:value="fuel"
              :options="fuelTypeOptions"
              @change="onFuelChange"
            />
          </n-thing>
          <n-thing title="Year" content-indented>
            <n-select
              clearable
              v-model:value="year"
              :options="yearOptions"
              @change="onYearChange"
            />
          </n-thing>
        </n-space>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NButton, NDrawer, NDrawerContent, NIcon, NSelect, NSpace, NThing } from 'naive-ui'
import { FilterAltFilled } from '@vicons/material'
import { useCars } from '../composables/useCars'
import type { FuelType, TransmissionFull } from '../types/CarInfo.type'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    NButton,
    NDrawer,
    NDrawerContent,
    NIcon,
    NSelect,
    FilterAltFilled,
    NSpace,
    NThing
  },
  setup() {
    const active = ref(false)
    const { query } = useRoute()

    const { fuelTypeOptions, transmissionOptions, yearOptions, updateCarsGetQuery } = useCars()

    const transmission = ref((query.transmission as TransmissionFull) ?? null)
    const fuel = ref((query.fuel_type as FuelType) ?? null)
    const year = ref(query.year?.toString() ?? null)

    const hasActiveFilters = computed(() => !!transmission.value || !!fuel.value || !!year.value)

    const activeFiltersCount = computed(() => {
      let filters: Array<boolean> = []

      filters.push(!!transmission.value)
      filters.push(!!fuel.value)
      filters.push(!!year.value)

      return filters.filter((f) => f).length
    })

    function onTransmissionChange(val: TransmissionFull | null) {
      updateCarsGetQuery(val, 'transmission')
    }

    function onFuelChange(val: FuelType | null) {
      updateCarsGetQuery(val, 'fuel_type ')
    }

    function onYearChange(val: string | null) {
      updateCarsGetQuery(val, 'year')
    }

    return {
      active,
      fuelTypeOptions,
      transmissionOptions,
      yearOptions,
      onTransmissionChange,
      onFuelChange,
      onYearChange,
      transmission,
      fuel,
      year,
      hasActiveFilters,
      activeFiltersCount
    }
  }
})
</script>

<style scoped></style>
