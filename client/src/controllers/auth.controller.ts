import AuthApi from '../Api/auth.api';
import { useUserStore } from '../stores/userStore';
import { useNotification } from '../composables/useNotification';

export default function useAuthController() {
    const { saveUser } = useUserStore();
    const { success } = useNotification();


    async function loginHandler(loginData: any) {
        const { data } = await AuthApi.login(loginData)

        saveUser(data)
        success("Logged in!");

        return data
    }

    async function registerHandler(registerData: any) {
        const { data } = await AuthApi.signUp(registerData)

        success("Success! User your login and password to login now!");

        return data
    }

    return {
        loginHandler,
        registerHandler
    }
}