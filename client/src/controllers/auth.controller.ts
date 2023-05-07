import AuthApi from '../Api/auth.api';
import { useUserStore } from '../stores/userStore';
import { useNotification } from '../composables/useNotification';
import { useWishlistStore } from '../stores/wishlistStore';

export default function useAuthController() {
    const { saveUser } = useUserStore();
    const { setWishesToStore } = useWishlistStore();
    const { success } = useNotification();


    async function loginHandler(loginData: any) {
        const { data } = await AuthApi.login(loginData)

        const { wishes, ...userDataFields } = data

        saveUser(userDataFields)
        setWishesToStore(wishes)
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