import AuthApi from '../Api/auth.api'
import { useUserStore } from '../stores/userStore'
import { useNotification } from '../composables/useNotification'
import { useWishlistStore } from '../stores/wishlistStore'
import type { LoginData, RegisterData } from '../types/Auth.types'

export default function useAuthController() {
  const { saveUser } = useUserStore()
  const { setWishesToStore } = useWishlistStore()
  const { success } = useNotification()

  async function loginHandler(loginData: LoginData) {
    const { data } = await AuthApi.login(loginData)

    const { wishes, ...userDataFields } = data

    saveUser(userDataFields)
    setWishesToStore(wishes)
    success('Logged in!')

    return data
  }

  async function registerHandler(registerData: RegisterData) {
    const { data } = await AuthApi.signUp(registerData)

    success(data.message)

    return data
  }

  return {
    loginHandler,
    registerHandler
  }
}
