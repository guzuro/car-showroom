import { onMounted, onUnmounted, ref, type Ref } from "vue";

export function useElementScrollable<T>(htmlRef: Ref<T extends HTMLElement ? T : null>) {

    const isWrapperScrollable = ref(false)

    function watchScrollableWrapper() {
        if (htmlRef.value) {

            isWrapperScrollable.value =
                htmlRef.value.scrollWidth > htmlRef.value.clientWidth
        } else {
            isWrapperScrollable.value = false
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
        isWrapperScrollable,
    }
}