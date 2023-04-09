<template>
    <div class="auth-layout">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router';
import { useThemeVars } from 'naive-ui'

export default defineComponent({
    components: {
        RouterView
    },
    setup() {
        const { primaryColor, infoColor } = unref(useThemeVars())


        return {
            primaryColor,
            infoColor
        }
    }
})
</script>

<style scoped lang="scss">
.auth-layout {
    height: 100vh;
    padding: 1.5rem;
    background: linear-gradient(-45deg, v-bind(infoColor) 20%, v-bind(primaryColor));
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>