import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import router from "../router";
import { useNotification } from "../composables/useNotification";

const authRoutes = ['SignIn', 'SignUp']

export default class HttpClient {
    private axios: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {

        this.axios = axios.create({
            baseURL: config?.baseURL ?? "http://localhost:3131/api",
        })

        this.axios.interceptors.response.use((response) => response, (error) => {
            const { error: errorNotify } = useNotification();
            const { status, statusText, data } = error.response

            errorNotify(
                `[${status}] ${statusText}`,
                data.message,
            )

            if (status === 403 && !authRoutes.includes(router.currentRoute.value.name as string)) {
                router.push({ name: "SignIn" });
            }

            return Promise.reject(error);
        });
    }

    protected async post<T = any>(url: string, body?: any | undefined, headers?: AxiosRequestConfig['headers']) {
        return this.request<T>(url, RequestMethod.POST, body, headers)
    }

    protected async get<T = any>(url: string, params?: Record<string, any>, headers?: AxiosRequestConfig['headers']) {
        return await this.request<T>(url, RequestMethod.GET, params, headers)
    }

    protected async delete<T = any>(url: string, params?: Record<string, any>, headers?: AxiosRequestConfig['headers']) {
        return await this.request<T>(url, RequestMethod.DELETE, params, headers)
    }

    private async request<T>(url: string, method: RequestMethod, body?: any | undefined, headers?: AxiosRequestConfig['headers']) {
        return this.axios<T>({
            method,
            url,
            headers: {
                ...headers
            },
            ...[RequestMethod.GET, RequestMethod.DELETE].includes(method) ? {
                params: {
                    ...body
                }
            } : {},
            data: {
                ...body
            }
        })
    }
}

const enum RequestMethod {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE'
}