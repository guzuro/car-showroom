<template>
  <div class="carlist-filters">
    <n-button :style="buttonStyles" @click="active = true">
      <template #icon>
        <n-icon>
          <FilterAltFilled />
        </n-icon>
      </template>

      Фильтры
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
          <n-thing clearable title="Fuel type" content-indented>
            <n-select v-model:value="fuel" :options="fuelTypeOptions" @change="onFuelChange" />
          </n-thing>
          <n-thing clearable title="Year" content-indented>
            <n-select v-model:value="year" :options="yearOptions" @change="onYearChange" />
          </n-thing>
        </n-space>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  NButton,
  NDrawer,
  NDrawerContent,
  NIcon,
  NSelect,
  NSpace,
  NThing,
  useThemeVars
} from 'naive-ui'
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
    const { value } = useThemeVars()

    const { fuelTypeOptions, transmissionOptions, yearOptions, updateCarsGetQuery } = useCars()

    const transmission = ref(query.transmission?.toString()?.toString() ?? '')
    const fuel = ref(query.fuel?.toString() ?? '')
    const year = ref(query.year?.toString() ?? '')

    const hasActiveFilters = computed(() => !!transmission.value || !!fuel.value || year.value)

    const buttonStyles = computed((): Partial<CSSStyleDeclaration> => {
      if (hasActiveFilters.value) {
        return {
          border: `1px ${value.actionColor} solid`
        }
      }

      return {}
    })

    function onTransmissionChange(val: TransmissionFull | null) {
      updateCarsGetQuery(val, 'transmission')
    }

    function onFuelChange(val: FuelType | null) {
      updateCarsGetQuery(val, 'fuel')
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
      buttonStyles
    }
  }
})
</script>

<style scoped></style>
