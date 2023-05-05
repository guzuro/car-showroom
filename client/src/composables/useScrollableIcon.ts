import { onMounted, onUnmounted, ref, type Ref } from "vue";

export function useScrollableIcon<T>(htmlRef: Ref<T extends HTMLElement ? T : null>) {

    const isSwipeIconVisible = ref(false)

    function watchScrollableWrapper() {
        if (htmlRef.value) {

            isSwipeIconVisible.value =
                htmlRef.value.scrollWidth > htmlRef.value.clientWidth
        } else {
            isSwipeIconVisible.value = false
        }
    }


    onMounted(() => {
        window.addEventListener('resize', watchScrollableWrapper)
        watchScrollableWrapper()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', watchScrollableWrapper)
    })

    return {
        isSwipeIconVisible,
    }
}