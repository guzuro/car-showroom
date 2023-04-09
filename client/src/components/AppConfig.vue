<template>
    <n-notification-provider placement="bottom-right">
        <notify-content />
        <n-spin :show="loading">
            <slot />
        </n-spin>
    </n-notification-provider>
</template>

<script lang="ts">
import { NNotificationProvider, NSpin } from 'naive-ui';
import { defineComponent } from 'vue'
import { useLoader } from '../composables/useLoader';
import NotifyContent from './NotifyContent.vue';

export default defineComponent({
    components: {
        NNotificationProvider,
        NSpin,
        NotifyContent
    },
    setup() {
        const { loading } = useLoader();

        return {
            loading
        }
    }
})

</script>

<style scoped></style>