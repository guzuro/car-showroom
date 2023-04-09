<template>
    <div />
</template>

<script lang="ts">
import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        window.$notify = useNotification()
    }
})
</script>

<style scoped></style>