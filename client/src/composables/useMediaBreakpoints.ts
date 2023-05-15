// https://www.naiveui.com/en-US/os-theme/components/config-provider#API
// { xs: 0, s: 640, m: 1024, l: 1280, xl: 1536, xxl: 1920 }
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'

const MediaBreakpoints: Record<LiteralBreakpoints, number> = {
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    xxl: 1920,
}

type LiteralBreakpoints = "xs" |
    "s" |
    "m" |
    "l" |
    "xl" |
    "xxl"

export function useMediaBreakpoints() {
    const { width } = useWindowSize()

    const screen = ref<Record<LiteralBreakpoints, boolean>>({
        "xs": false,
        "s": false,
        "m": false,
        "l": false,
        "xl": false,
        "xxl": false,
    })

    watch(width, (val) => {
        Object.entries(MediaBreakpoints).forEach(([key, value]) => {
            const bp = key as LiteralBreakpoints

            if (val >= value) {
                screen.value[bp] = true
            } else {
                screen.value[bp] = false
            }
        })
    })

    return {
        screen
    }
}