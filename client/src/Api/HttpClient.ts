import type { AxiosInstance } from "axios";
import axios from "axios";
import router from "../router";
import type { AxiosHeaders } from "axios";
import { useNotification } from "../composables/useNotification";

const authRoutes = ['SignIn', 'SignUp']

class HttpClient {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:3131/api",
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

    async post<T = any>(url: string, body?: any | undefined, headers?: AxiosHeaders) {
        return this.request<T>(url, RequestMethod.POST, body, headers)
    }

    async get<T = any>(url: string, body: any, headers?: AxiosHeaders) {
        return await this.request<T>(url, RequestMethod.POST, body, headers)
    }

    private async request<T>(url: string, method: RequestMethod, body?: any | undefined, headers?: AxiosHeaders) {
        return this.axios<T>({
            method,
            url,
            headers,
            data: {
                ...body
            }
        })
    }
}

export default new HttpClient()

const enum RequestMethod {
    POST = 'POST',
    GET = 'GET'
}