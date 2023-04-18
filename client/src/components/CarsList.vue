<template>
    <ul class="cars-list">
        <li v-for="(car, index) in cars" :key="index">
            <n-card class="cars-list__card" :title="car.model" :header-style="{
                    textTransform: 'capitalize'
                }">
                <template #header-extra>
                    {{ car.make }}
                </template>
                <template #cover>
                    <div class="cars-list__image">
                        <n-icon :color="warningColor" class="cars-list__bookmark" size="30" @click="addToWishList(car)">
                            <bookmark />
                        </n-icon>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKeSfXSGkhfHh3OrZ0LbggDGyT45sz1IRTzQJnzClJ&s">
                    </div>
                </template>
            </n-card>
            {{ car }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { NCard } from 'naive-ui'
import { Bookmark } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { useThemeVars } from 'naive-ui';

export default defineComponent({
    components: {
        NCard,
        Bookmark,
        NIcon
    },
    props: {
        cars: {
            type: Object as PropType<any>,
            required: true
        }
    },

    setup() {
        const theme = useThemeVars()
        const { warningColor, warningColorHover } = theme.value;

        function addToWishList(car: any) {
            const { model, index } = car

            console.log(car);

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
.cars-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;

    li {
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: 100%;

        @media(min-width: 768px) {
            flex-basis: 50%;
        }

        @media(min-width: 1024px) {
            flex-basis: 33.33333%;
        }

        @media(min-width: 1280px) {
            flex-basis: 20%;
        }
    }

    &__card {
        position: relative;
    }

    &__bookmark {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;

        &:hover svg {
            color: v-bind(warningColorHover) !important;
        }
    }

    &__image img {
        max-width: 200px;
        margin: 0 auto;
        display: block;
    }
}
</style>