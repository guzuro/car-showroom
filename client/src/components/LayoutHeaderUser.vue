<template>
    <div class="layout-user-header">
        <div v-if="user">
            user icon
        </div>
        <div v-else class="layout-user-header__auth" @click="gotoAuthPage">
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
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        NIcon,
        LogInOutline
    },
    setup() {
        const { user } = useUserStore();
        const { push } = useRouter()

        function gotoAuthPage() {
            push({
                name: "SignIn"
            })
        }

        return {
            user,
            gotoAuthPage
        }
    }
})
</script>

<style scoped lang="scss">
.layout-user-header {
    &__auth {
        height: 100%;
        display: flex;
        align-items: center;


        &:hover {
            cursor: pointer;
            opacity: .7;
        }
    }
}
</style>