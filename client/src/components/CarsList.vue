<template>
    <ul class="cars-list">
        <li v-for="(car, index) in cars" :key="index">

            {{ car }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
    props: {
        cars: {
            type: Object as PropType<any>,
            required: true
        }
    },

    setup() {


        return {}
    }
})
</script>

<style scoped></style>