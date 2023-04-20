import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const user = ref<Object | null>(null)

    function saveUser(payload: any) {
        user.value = payload
    }

    return {
        user,
        saveUser
    }
})