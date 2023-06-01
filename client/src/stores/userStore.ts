import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '../types/User.types'

export const useUserStore = defineStore('user', () => {
  const user = ref<Omit<User, 'wishes'> | null>(null)

  const userFullName = computed(() => {
    if (user.value) {
      if (user.value.firstName || user.value.lastName) {
        return `${user.value.firstName || ''} ${user.value.lastName || ''}`
      }

      return user.value.email
    } else {
      return null
    }
  })

  function saveUser(payload: Omit<User, 'wishes'>) {
    user.value = payload
  }

  return {
    user,
    userFullName,
    saveUser
  }
})
