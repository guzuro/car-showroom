<template>
    <n-layout class="main-layout" :content-style="mainLayoutContentStyles">
        <n-layout-header>
            <layout-header></layout-header>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
            <router-view />
        </n-layout-content>
        <n-layout-footer>
            <layout-footer></layout-footer>
        </n-layout-footer>
    </n-layout>
</template>

<script lang="ts">
import { NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent } from 'naive-ui';
import LayoutFooter from '../components/LayoutFooter.vue';
import LayoutHeader from '../components/LayoutHeader.vue';
import { defineComponent, type CSSProperties } from 'vue'
import { RouterView } from 'vue-router';

export default defineComponent({
    components: {
        RouterView,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        LayoutHeader,
        LayoutFooter
    },
    setup() {
        const mainLayoutContentStyles: CSSProperties = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }

        return {
            mainLayoutContentStyles
        }
    }
})
</script>

<style scoped lang="scss">
.main-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>