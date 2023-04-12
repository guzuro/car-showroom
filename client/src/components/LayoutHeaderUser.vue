<template>
    <div class="layout-user-header">
        <div v-if="user">
            user icon
        </div>
        <div v-else class="layout-user-header__auth">
            Sign in
            <n-icon :size="30">
                <LogInOutline />
            </n-icon>
        </div>
    </div>
</template>

<script lang="ts">
import { LogInOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore';

export default defineComponent({
    components: {
        NIcon,
        LogInOutline
    },
    setup() {
        const { user } = useUserStore();

        return {
            user
        }
    }
})
</script>

<style scoped lang="scss">
.layout-user-header {
    &__auth {
        display: flex;
        align-items: center;


        &:hover {
            cursor: pointer;
            opacity: .7;
        }
    }
}
</style>