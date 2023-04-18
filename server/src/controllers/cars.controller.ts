import { Request, Response, NextFunction } from "express";
import HttpClient from "./HttpClient";
import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import HttpException from "../exceptions/HttpException";


const httpCLient = new HttpClient({
    baseURL: "https://api.api-ninjas.com/v1/",
    headers: {
        'X-Api-Key': process.env.CAR_API_KEY
    }
})

export const randomCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getRequests = [
            httpCLient.get('cars', { make: 'audi', limit: 10 }),
            httpCLient.get('cars', { make: 'kia', limit: 10 }),
            httpCLient.get('cars', { make: 'toyota', limit: 10 }),
            httpCLient.get('cars', { make: 'volkswagen', limit: 10 })
        ]

        const cars = await
            (await Promise.all(getRequests))
                .map(({ data }) => data)
                .map(data => {
                    return data.map((el: any, index: number) => ({
                        ...el, index
                    }));
                })
                .flat()
                .sort(() => Math.random() - Math.random())
                .slice(0, 10)


        res.statusCode = 200;
        res.send(cars)
    } catch (error: unknown) {

        if (isAxiosError(error)) {
            const axiosError: AxiosError = error

            next(new HttpException(error.response?.status ?? 500, axiosError.message))
        } else {
            next(new HttpException(500, ''))

        }
    }
}

export const carsByModel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await httpCLient.get('cars', req.query)
        console.log(data, 'data');

        res.statusCode = 200;
        res.send(
            data
        )
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const axiosError: AxiosError = error

            next(new HttpException(error.response?.status!, axiosError.message))
        } else {
            next(new HttpException(500, ''))

        }
    }
}