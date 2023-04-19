<template>
    <div class="sign-in auth-form">
        <n-form ref="formRef" :model="signInData" :rules="rules">
            <n-form-item label="Login" path="login">
                <n-input v-model:value="signInData.login" class="card__login" placeholder="Login...">
                    <template #prefix>
                        <n-icon :component="Person" />
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="Password" path="password">
                <n-input v-model:value="signInData.password" class="card__password" type="password" show-password-on="click"
                    placeholder="Password...">
                    <template #prefix>
                        <n-icon :component="Eye" />
                    </template>
                    <template #password-visible-icon>
                        <n-icon :component="GlassesOutline" />
                    </template>
                    <template #password-invisible-icon>
                        <n-icon :component="Glasses" />
                    </template>
                </n-input>
            </n-form-item>
            <div class="sign-in__button">
                <n-button :disabled="!signInData.login && !signInData.password" type="success" @click="doLogin">
                    Sign in
                </n-button>
            </div>
        </n-form>

        <div class="auth-form__footer">
            <span>
                Don't have an account?
            </span>
            &nbsp;
            <a class="auth-form__change-form" @click="emit('signUpClick')">
                Sign Up
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NForm, NFormItem, NInput, NIcon, NButton } from 'naive-ui';
import { Person, GlassesOutline, Glasses, Eye } from '@vicons/ionicons5'
import useAuthController from '../../controllers/auth.controller';

export default defineComponent({
    components: {
        NInput,
        NIcon,
        NForm,
        NFormItem,
        NButton,
    },
    emits: ['signUpClick'],
    setup(props, { emit }) {
        const { loginHandler } = useAuthController()

        const signInData = ref({
            login: '',
            password: ''
        })

        const rules = {
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
        }

        function doLogin(): void {
            loginHandler(signInData.value);
        }

        return {
            emit,
            signInData,
            rules,
            doLogin,
            Person,
            GlassesOutline,
            Glasses,
            Eye
        }
    }
})
</script>

<style scoped lang="scss">
@import "./auth.styles.scss"
</style>