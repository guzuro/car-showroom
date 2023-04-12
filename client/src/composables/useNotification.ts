export function useNotification() {
    const options = {
        duration: 3000
    }

    const success = (title: string, content?: string) => {
        window.$notify.success({
            title,
            content,
            ...options
        })
    }

    const error = (title: string, content?: string) => {
        window.$notify.error({
            title,
            content,
            ...options
        })
    }

    return {
        success,
        error,
    }
}