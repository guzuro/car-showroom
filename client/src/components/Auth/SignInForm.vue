<template>
  <div class="sign-in auth-form">
    <n-spin :show="authInLoading">
      <n-form ref="formRef" :model="signInData" :rules="rules">
        <n-form-item label="Login" path="login">
          <n-input v-model:value="signInData.login" class="card__login" placeholder="Login...">
            <template #prefix>
              <n-icon :component="PersonFilled" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input
            v-model:value="signInData.password"
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
        <div class="sign-in__button">
          <n-button
            :disabled="!signInData.login && !signInData.password"
            type="success"
            @click="handleSubmit"
          >
            Sign in
          </n-button>
        </div>
      </n-form>

      <div class="auth-form__footer">
        <span> Don't have an account? </span>
        &nbsp;
        <a class="auth-form__change-form" @click="emit('signUpClick')"> Sign Up </a>
      </div>
    </n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  NSpin,
  NForm,
  NFormItem,
  NInput,
  NIcon,
  NButton,
  type FormRules,
  type FormInst
} from 'naive-ui'
import { PersonFilled, LockOpenFilled, PasswordFilled, LockFilled } from '@vicons/material'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import handleFormValidate from '../../utils/handleFormValidate'

import useAuthController from '../../controllers/auth.controller'
import { useNotification } from '../../composables/useNotification'

export default defineComponent({
  components: {
    NInput,
    NIcon,
    NForm,
    NFormItem,
    NButton,
    NSpin
  },
  emits: ['signUpClick', 'onLogin'],
  setup(props, { emit }) {
    const { loginHandler } = useAuthController()
    const { error } = useNotification()

    const formRef = ref<FormInst | null>(null)
    const authInLoading = ref(false)

    const signInData = ref({
      login: '',
      password: ''
    })

    const rules: FormRules = {
      login: {
        required: true,
        message: 'Login is required',
        trigger: ['input', 'blur']
      },
      password: [
        {
          required: true,
          message: 'Password is required',
          trigger: ['input', 'blur']
        },
        {
          min: 8,
          message: 'Must be at least 8 symbols',
          trigger: ['input']
        }
      ]
    }

    async function doLogin(): Promise<void> {
      authInLoading.value = true

      try {
        await loginHandler(signInData.value)
        emit('onLogin')
      } finally {
        authInLoading.value = false
      }
    }

    async function handleSubmit(e: MouseEvent) {
      const onValidate: FormValidateCallback = (errors) => {
        if (!errors) {
          doLogin()
        } else {
          error('Fill the fields correctly')
        }
      }

      handleFormValidate(e, formRef, onValidate)
    }

    return {
      emit,
      signInData,
      rules,
      PersonFilled,
      PasswordFilled,
      LockFilled,
      LockOpenFilled,
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
