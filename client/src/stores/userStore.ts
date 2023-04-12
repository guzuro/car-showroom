import { defineStore } from "pinia"

interface UserState {
    user: any
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            user: null
        }
    },
    actions: {
        saveUser(user: any) {
            this.user = user
        }
    },
})