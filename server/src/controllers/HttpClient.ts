import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const authRoutes = ['SignIn', 'SignUp']

export default class HttpClient {
    private axios: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {

        this.axios = axios.create({
            baseURL: config?.baseURL,
            headers: config?.headers
        })
    }

    async post<T = any>(url: string, body?: any | undefined, headers?: AxiosRequestConfig['headers']) {
        return this.request<T>(url, RequestMethod.POST, body, headers)
    }

    async get<T = any>(url: string, params?: Record<string, any>, headers?: AxiosRequestConfig['headers']) {
        const query = ''

        return await this.request<T>(url, RequestMethod.GET, params, headers)
    }

    private async request<T>(url: string, method: RequestMethod, body?: any | undefined, headers?: AxiosRequestConfig['headers']) {


        return this.axios<T>({
            method,
            url,
            headers: {
                ...headers
            },
            ...method === RequestMethod.GET ? {
                params: {
                    ...body
                }
            } : {},
            ...method === RequestMethod.POST ? {
                data: {
                    ...body
                }
            } : {}
        })
    }

    private queryBuilder(body: Record<string, any>): string {
        return Object
            .entries(body)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
    }
}

const enum RequestMethod {
    POST = 'POST',
    GET = 'GET'
}