<template>
  <n-card
    class="cars-list-item"
    :title="car.model"
    :header-style="{
      textTransform: 'capitalize'
    }"
  >
    <template #header-extra>
      {{ car.make }}
    </template>
    <template #cover>
      <div class="cars-list-item__image">
        <n-icon
          v-if="bookmarkIcon"
          :color="!isCarInList(car) ? warningColor : errorColor"
          class="cars-list-item__icon"
          :class="bookmarkHoverClass"
          size="30"
          @click="onBookmarkClick"
        >
          <bookmark-filled />
        </n-icon>
        <n-icon
          v-if="deleteIcon"
          :color="errorColor"
          class="cars-list-item__icon icon-delete"
          size="30"
          @click="onDeleteClick"
        >
          <delete-filled />
        </n-icon>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKeSfXSGkhfHh3OrZ0LbggDGyT45sz1IRTzQJnzClJ&s"
        />
      </div>
    </template>
    <ul class="cars-list-item__list list">
      <li class="list__item">
        <n-icon :size="20">
          <CalendarMonthFilled />
        </n-icon>
        {{ car.year }}
      </li>
      <li class="list__item">
        <n-icon :size="20">
          <LocalGasStationFilled />
        </n-icon>
        {{ car.fuel_type }}
      </li>
      <li class="list__item">
        <n-icon :size="20">
          <MiscellaneousServicesOutlined />
        </n-icon>
        {{ transmissionAlias }}
      </li>
    </ul>
  </n-card>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { NCard } from 'naive-ui'
import {
  BookmarkFilled,
  DeleteFilled,
  CalendarMonthFilled,
  LocalGasStationFilled,
  MiscellaneousServicesOutlined
} from '@vicons/material'
import { NIcon } from 'naive-ui'
import { useThemeVars } from 'naive-ui'
import type { CarInfo } from '../../types/CarInfo.type'
import { useWishlistStore } from '../../stores/wishlistStore'

export default defineComponent({
  components: {
    NCard,
    BookmarkFilled,
    DeleteFilled,
    NIcon,
    CalendarMonthFilled,
    LocalGasStationFilled,
    MiscellaneousServicesOutlined
  },
  props: {
    car: {
      type: Object as PropType<CarInfo>,
      required: true
    },
    bookmarkIcon: {
      type: Boolean,
      default: false
    },
    deleteIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ['bookmarkClick', 'deleteClick'],
  setup(props, { emit }) {
    const theme = useThemeVars()
    const { isCarInList } = useWishlistStore()
    const { warningColor, warningColorHover, errorColor, errorColorHover } = theme.value

    const bookmarkHoverClass = computed(() => {
      return isCarInList(props.car)
        ? 'cars-list-item__icon-in-list'
        : 'cars-list-item__icon-not-in-list'
    })

    function onBookmarkClick() {
      emit('bookmarkClick', props.car)
    }

    function onDeleteClick() {
      emit('deleteClick')
    }

    const transmissionAlias = computed(() => {
      if (props.car.transmission === 'a') {
        return 'auto'
      } else if (props.car.transmission === 'm') {
        return 'manual'
      } else {
        return ''
      }
    })

    return {
      warningColor,
      errorColor,
      warningColorHover,
      errorColorHover,
      onBookmarkClick,
      onDeleteClick,
      isCarInList,
      bookmarkHoverClass,
      transmissionAlias
    }
  }
})
</script>

<style scoped lang="scss">
.cars-list-item {
  &__card {
    position: relative;
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    z-index: 2;

    &-not-in-list {
      &:hover svg {
        color: v-bind(warningColorHover) !important;
      }
    }

    &-in-list {
      &:hover svg {
        color: v-bind(errorColorHover) !important;
      }
    }
  }

  .list {
    &__item {
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;
    }
  }

  .icon-delete {
    &:hover {
      color: v-bind(errorColorHover) !important;
    }
  }

  &__image img {
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }
}
</style>
