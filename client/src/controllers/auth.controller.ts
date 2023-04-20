import AuthApi from '../Api/auth.api';
import { useUserStore } from '../stores/userStore';
import { useLoader } from '../composables/useLoader';
import { useNotification } from '../composables/useNotification';

export default function useAuthController() {
    const { open, close } = useLoader();
    const { saveUser } = useUserStore();
    const { success } = useNotification();


    async function loginHandler(loginData: any) {
        try {
            open()

            const { data } = await AuthApi.login(loginData)
            console.log('lol');

            saveUser(data)
            success("Logged in!");

            return data
        } finally {
            close()
        }
    }

    return {
        loginHandler
    }
}