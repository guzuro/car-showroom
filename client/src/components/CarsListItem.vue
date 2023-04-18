<template>
    <n-card class="cars-list-item" :title="car.model" :header-style="{
            textTransform: 'capitalize'
        }">
        <template #header-extra>
            {{ car.make }}
        </template>
        <template #cover>
            <div class="cars-list-item__image">
                <n-icon :color="warningColor" class="cars-list-item__bookmark" size="30" @click="addToWishList(car)">
                    <bookmark />
                </n-icon>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKeSfXSGkhfHh3OrZ0LbggDGyT45sz1IRTzQJnzClJ&s">
            </div>
        </template>
    </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
        car: {
            type: Object,
            required: true
        }
    },

    setup() {
        const theme = useThemeVars()
        const { warningColor, warningColorHover } = theme.value;

        return {
            warningColor,
            warningColorHover,
        }
    }
})
</script>

<style scoped lang="scss">
.cars-list-item {
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