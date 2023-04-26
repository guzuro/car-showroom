<template>
  <n-modal
    :title="modalAuthTitle"
    style="width: 600px"
    preset="card"
    class="auth-modal"
    v-model:show="authModal"
  >
    <sign-in-form
      v-if="currentForm === AuthForm.SignIn"
      @signUpClick="changeForm(AuthForm.SignUp)"
      @on-login="onLogin"
    />
    <sign-up-form
      v-if="currentForm === AuthForm.SignUp"
      @signInClick="changeForm(AuthForm.SignIn)"
      @on-signup="onSignup"
    />
  </n-modal>
</template>

<script lang="ts">
enum AuthForm {
  SignIn,
  SignUp
}

import { computed, defineComponent, ref, toRefs, unref } from 'vue'
import { NModal } from 'naive-ui'
import SignInForm from './Auth/SignInForm.vue'
import SignUpForm from './Auth/SignUpForm.vue'

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
  setup(props, { emit }) {
    const currentForm = ref(AuthForm.SignIn)

    const { modelValue } = toRefs(props)

    const modalAuthTitle = computed(() => {
      if (currentForm.value === AuthForm.SignIn) return 'Sign In'
      if (currentForm.value === AuthForm.SignUp) return 'Sign Up'

      return ''
    })

    function changeForm(formType: AuthForm) {
      currentForm.value = formType
    }

    const authModal = computed({
      get() {
        return unref(modelValue)
      },
      set(newValue) {
        emit('update:modelValue', newValue)
      }
    })

    function onLogin() {
      authModal.value = false
    }

    function onSignup() {
      changeForm(AuthForm.SignIn)
    }

    return {
      currentForm,
      modalAuthTitle,
      changeForm,
      AuthForm,
      onLogin,
      onSignup,
      authModal
    }
  }
})
</script>

<style scoped></style>
