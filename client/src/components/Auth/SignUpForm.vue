<template>
  <div class="sign-up auth-form">
    <n-spin :show="authInLoading">
      <n-form
        ref="formRef"
        :model="signUpData"
        :rules="rules"
      >
        <n-form-item
          label="Login"
          path="login"
        >
          <n-input
            v-model:value="signUpData.login"
            class="card__login"
            placeholder="Login..."
          >
            <template #prefix>
              <n-icon :component="PersonFilled" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item
          label="E-mail"
          path="email"
        >
          <n-input
            v-model:value="signUpData.email"
            class="card__email"
            placeholder="E-mail..."
          >
            <template #prefix>
              <n-icon :component="EmailFilled" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item
          label="Password"
          path="password"
        >
          <n-input
            v-model:value="signUpData.password"
            class="card__password"
            type="password"
            show-password-on="click"
            placeholder="Password..."
          >
            <template #prefix>
              <n-icon :component="PasswordFilled" />
            </template>
            <template #password-visible-icon>
              <n-icon :component="LockOpenFilled" />
            </template>
            <template #password-invisible-icon>
              <n-icon :component="LockFilled" />
            </template>
          </n-input>
        </n-form-item>
        <div class="sign-up__button">
          <n-button
            :disabled="!signUpData.login && !signUpData.email && !signUpData.password"
            type="success"
            @click="handleSubmit"
          >
            Sign up
          </n-button>
        </div>
      </n-form>

      <div class="auth-form__footer">
        <span> Already have an account? </span>
        &nbsp;
        <a
          class="auth-form__change-form"
          @click="emit('signInClick')"
        >
          Sign In
        </a>
      </div>
    </n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NForm, NFormItem, NInput, NIcon, NButton, type FormRules, type FormInst } from 'naive-ui'
import { useNotification } from '../../composables/useNotification'
import handleFormValidate from '../../utils/handleFormValidate'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import {
  PersonFilled,
  EmailFilled,
  LockOpenFilled,
  PasswordFilled,
  LockFilled
} from '@vicons/material'
import useAuthController from '../../controllers/auth.controller'

export default defineComponent({
  components: {
    NInput,
    NIcon,
    NForm,
    NFormItem,
    NButton
  },
  emits: ['signInClick', 'onSignup'],
  setup(props, { emit }) {
    const { error } = useNotification()
    const { registerHandler } = useAuthController()

    const formRef = ref<FormInst | null>(null)
    const authInLoading = ref(false)

    const signUpData = ref({
      login: '',
      email: '',
      password: ''
    })

    const rules: FormRules = {
      login: {
        required: true,
        message: 'Login is required',
        trigger: ['input']
      },
      email: {
        required: true,
        message: 'Email is required',
        trigger: ['input']
      },
      password: [
        {
          required: true,
          message: 'Password is required',
          trigger: ['input']
        },
        {
          min: 8,
          message: 'Must be at least 8 symbols',
          trigger: ['input']
        }
      ]
    }

    async function doSignup(): Promise<void> {
      authInLoading.value = true

      try {
        await registerHandler(signUpData.value)
        emit('onSignup')
      } finally {
        authInLoading.value = false
      }
    }

    function handleSubmit(e: MouseEvent) {
      const onValidate: FormValidateCallback = (errors) => {
        if (!errors) {
          doSignup()
        } else {
          error('Fill the fields correctly')
        }
      }

      handleFormValidate(e, formRef, onValidate)
    }

    return {
      emit,
      signUpData,
      rules,
      PersonFilled,
      LockOpenFilled,
      PasswordFilled,
      LockFilled,
      EmailFilled,
      formRef,
      handleSubmit,
      authInLoading
    }
  }
})
</script>

<style scoped lang="scss">
@import './auth.styles.scss';
</style>
