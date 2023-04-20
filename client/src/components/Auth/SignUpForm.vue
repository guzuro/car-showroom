<template>
    <div class="sign-up auth-form">
        <n-form ref="formRef" :model="signUpData" :rules="rules">
            <n-form-item label="Login" path="login">
                <n-input v-model:value="signUpData.login" class="card__login" placeholder="Login...">
                    <template #prefix>
                        <n-icon :component="Person" />
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="E-mail" path="email">
                <n-input v-model:value="signUpData.email" class="card__email" placeholder="E-mail...">
                    <template #prefix>
                        <n-icon :component="MailOutline" />
                    </template>
                </n-input>
            </n-form-item>
            <n-form-item label="Password" path="password">
                <n-input v-model:value="signUpData.password" class="card__password" type="password" show-password-on="click"
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
            <div class="sign-up__button">
                <n-button :disabled="!signUpData.login &&
                    !signUpData.email &&
                    !signUpData.password
                    " type="success" @click="doSignup">
                    Sign up
                </n-button>
            </div>
        </n-form>

        <div class="auth-form__footer">
            <span>
                Already have an account?
            </span>
            &nbsp;
            <a class="auth-form__change-form" @click="emit('signInClick')">
                Sign In
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
    NForm,
    NFormItem,
    NInput,
    NIcon,
    NButton,
    type FormRules,
} from "naive-ui";
import {
    Person,
    MailOutline,
    GlassesOutline,
    Glasses,
    Eye,
} from "@vicons/ionicons5";

export default defineComponent({
    components: {
        NInput,
        NIcon,
        NForm,
        NFormItem,
        NButton,
    },
    emits: ['signInClick'],
    setup(props, { emit }) {
        const signUpData = ref({
            login: "",
            email: "",
            password: "",
        });

        const rules: FormRules = {
            login: {
                required: true,
                message: "Login is required",
                trigger: ["input"],
            },
            email: {
                required: true,
                message: "Email is required",
                trigger: ["input"],
            },
            password: [
                {
                    required: true,
                    message: "Password is required",
                    trigger: ["input"],
                },
                {
                    min: 6,
                    message: "Must be at least 6 symbols",
                    trigger: ["input"],
                },
            ],
        };

        function doSignup(): void {
            console.log('do login');
        }

        return {
            emit,
            signUpData,
            rules,
            doSignup,
            Person,
            GlassesOutline,
            Glasses,
            Eye,
            MailOutline,
        };
    },
});
</script>

<style scoped lang="scss">
@import "./auth.styles.scss"
</style>