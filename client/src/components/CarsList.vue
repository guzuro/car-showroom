<template>
    <ul class="cars-list">
        <li v-for="(car, index) in cars" :key="index" @click="addToWishList(car)">
            <cars-list-item :car="car" />
            {{ car }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useThemeVars } from 'naive-ui';
import { useUserStore } from '../stores/userStore';
import { useNotification } from '../composables/useNotification';
import CarsListItem from './CarsListItem.vue'
import type { CarInfo } from '../types/CarInfo.type';

export default defineComponent({
    components: {
        CarsListItem
    },
    props: {
        cars: {
            type: Array as PropType<Array<CarInfo>>,
            required: true,
            default: () => []
        }
    },

    setup() {
        const { user } = useUserStore()
        const { error } = useNotification()
        const theme = useThemeVars()
        const { warningColor, warningColorHover } = theme.value;

        function addToWishList(car: any) {
            if (!user) {
                error('Sign in to add to wishlist')
            } else {
                const { model, index } = car
            }
        }

        return {
            warningColor,
            warningColorHover,
            addToWishList
        }
    }
})
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.cars-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;

    li {
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: 100%;

        @media(min-width: $md) {
            flex-basis: 50%;
        }

        @media(min-width: $lg) {
            flex-basis: 33.33333%;
        }

        @media(min-width: $xl) {
            flex-basis: 20%;
        }
    }
}
</style>