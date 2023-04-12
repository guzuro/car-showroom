<template>
    <div class="layout-header-wrapper">
        <div class="layout-header">
            <div class="layout-header__app-name">
                WERTTT
            </div>
            <div class="layout-header__user">
                <layout-header-user />

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeaderUser from './LayoutHeaderUser.vue';

export default defineComponent({
    components: {
        LayoutHeaderUser
    },
    setup() {


        return {}
    }
})
</script>

<style scoped lang="scss">
.layout-header {
    &-wrapper {}

    display: flex;
    justify-content: space-between;
    padding: 25px;

    &__app-name {}

    &__user {}
}
</style>