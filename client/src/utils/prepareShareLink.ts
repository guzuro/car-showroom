import { useClipboard } from "@vueuse/core"
import { useNotification } from "../composables/useNotification"

const { copy } = useClipboard()
const { success } = useNotification()


export function prepareShareLink(shareKey: string) {
    const origin = window.location.origin
    const routeName = '/list-share/'

    const link = origin + routeName + shareKey

    copy(link)
    success('Copied')
}
