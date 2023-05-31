import { ref } from 'vue'

const loading = ref(false)

export function useLoader() {
  const open = () => (loading.value = true)
  const close = () => (loading.value = false)

  return {
    open,
    close,
    loading
  }
}
