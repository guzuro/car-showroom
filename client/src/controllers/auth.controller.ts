import AuthApi from '../Api/auth.api';
import { useUserStore } from '../stores/userStore';
import { useLoader } from '../composables/useLoader';
import { useRouter } from 'vue-router';
import { useNotification } from '../composables/useNotification';

export default function useAuthController() {
    const { push } = useRouter();
    const { open, close } = useLoader();
    const { saveUser } = useUserStore();
    const { success } = useNotification();


    async function loginHandler(loginData: any) {
        try {
            open()

            const { data } = await AuthApi.login(loginData)
            saveUser(data)
            success("Logged in!");

            push({ name: "Catalog" })
        } finally {
            close()
        }

    }

    return {
        loginHandler
    }
}