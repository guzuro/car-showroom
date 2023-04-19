<template>
    <n-modal :title="modalAuthTitle" style="width: 600px" preset="card" class="auth-modal" v-model="showModal">
        <sign-in-form v-if="currentForm === AuthForm.SignIn" @signUpClick="changeForm(AuthForm.SignUp)" />
        <sign-up-form v-if="currentForm === AuthForm.SignUp" @signInClick="changeForm(AuthForm.SignIn)" />
    </n-modal>
</template>

<script lang="ts">
enum AuthForm {
    SignIn,
    SignUp
}

import { computed, defineComponent, ref } from 'vue'
import { NModal, } from 'naive-ui';
import SignInForm from './Auth/SignInForm.vue';
import SignUpForm from './Auth/SignUpForm.vue';

export default defineComponent({
    components: {
        NModal,
        SignInForm,
        SignUpForm
    },
    props: {
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    setup() {
        const currentForm = ref(AuthForm.SignIn)

        const modalAuthTitle = computed(() => {
            if (currentForm.value === AuthForm.SignIn) return 'Sign In'
            if (currentForm.value === AuthForm.SignUp) return 'Sign Up'

            return ''
        })

        function changeForm(formType: AuthForm) {
            currentForm.value = formType
        }

        return {
            currentForm,
            modalAuthTitle,
            changeForm,
            showModal: ref(false),
            AuthForm,
        }
    }
})
</script>

<style scoped></style>