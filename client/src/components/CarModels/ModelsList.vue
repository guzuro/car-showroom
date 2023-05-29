<template>
  <div class="models-list-wrapper">
    <ul class="models-list" ref="scrollableWrapper">
      <li
        v-for="li in list"
        :key="li.value"
        class="models-list__item"
        @click="selectModel(li.value)"
      >
        <model-list-card
          :class="{ 'models-list__item-active': selectedModel === li.value }"
          :model="li"
        />
        <n-icon size="32" class="models-list__icon" v-if="selectedModel === li.value">
          <star-filled />
        </n-icon>
      </li>
    </ul>
    <n-icon v-if="isWrapperScrollable" class="models-list-wrapper__swipe" size="32">
      <swipe-filled />
    </n-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ModelListCard from './ModelListCard.vue'
import audiImg from '../../assets/image/audi.jpg'
import kiaImg from '../../assets/image/kia.jpg'
import toyotaImg from '../../assets/image/toyota.jpg'
import volkswagenImg from '../../assets/image/volkswagen.jpg'
import { CarModel, type ModelItem, type ModelsList } from './types'
import { NIcon, useThemeVars } from 'naive-ui'
import { StarFilled, SwipeFilled } from '@vicons/material'
import { useElementScrollable } from '../../composables/useElementScrollable'

const list: ModelsList = [
  {
    img: audiImg,
    value: CarModel.audi
  },
  {
    img: kiaImg,
    value: CarModel.kia
  },
  {
    img: toyotaImg,
    value: CarModel.toyota
  },
  {
    img: volkswagenImg,
    value: CarModel.volkswagen
  }
]

export default defineComponent({
  components: {
    ModelListCard,
    NIcon,
    StarFilled,
    SwipeFilled
  },
  emits: ['selectModel'],
  setup(_, { emit }) {
    const selectedModel = ref<CarModel | null>(null)
    const theme = useThemeVars()
    const { warningColor } = theme.value
    const scrollableWrapper = ref<HTMLDivElement | null>(null)
    const { isWrapperScrollable } = useElementScrollable(scrollableWrapper)

    function selectModel(model: ModelItem['value']) {
      if (model === selectedModel.value) {
        selectedModel.value = null
        emit('selectModel', null)
      } else {
        selectedModel.value = model
        emit('selectModel', model)
      }
    }

    return {
      list,
      selectedModel,
      warningColor,
      selectModel,
      scrollableWrapper,
      isWrapperScrollable
    }
  }
})
</script>

<style scoped lang="scss">
.models-list {
  text-align: center;
  white-space: nowrap;
  overflow: auto;

  &-wrapper {
    text-align: center;

    &__swipe {
      animation: spin 1.3s infinite alternate-reverse;
      margin-top: 5px;

      @keyframes spin {
        from {
          transform: rotate(-35deg);
        }
        to {
          transform: rotate(35deg);
        }
      }
    }
  }

  &__item {
    display: inline-block;
    position: relative;
    margin-right: 5px;

    &-active {
      filter: brightness(55%);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__icon {
    position: absolute;
    pointer-events: none;
    color: v-bind(warningColor);
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
