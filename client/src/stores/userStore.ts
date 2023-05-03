import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const user = ref<any | null>(null)

    const userFullName = computed(() => {
        if (user.value.firstName || user.value.lastName) {
            return `${user.value.firstName || ''} ${user.value.lastName || ''}`
        }

        return user.value.email
    })

    function saveUser(payload: any) {
        user.value = payload
    }

    return {
        user,
        userFullName,
        saveUser
    }
})