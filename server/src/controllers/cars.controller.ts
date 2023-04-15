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
            httpCLient.get('cars', { make: 'audi' }),
            httpCLient.get('cars', { make: 'kia' }),
            httpCLient.get('cars', { make: 'toyota' }),
            httpCLient.get('cars', { make: 'volkswagen' })
        ]

        const cars = await
            (await Promise.all(getRequests))
                .map(({ data }) => data)
                .flat()
                .sort(() => Math.random() - Math.random())
                .slice(0, 5)


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

// class CarApi extends HttpClient {
//     private headers: AxiosRequestConfig['headers'] = {
//         'X-Api-Key': process.env.CAR_API_KEY
//     }

//     constructor() {
//         super(
//             {
//                 baseURL: "https://api.api-ninjas.com/v1/",
//             })
//     }

//     async getMake(body?: Record<string, any>) {
//         return await this.get('cars', body, this.headers)
//     }

//     async signUp(body: any) {
//         return await this.post('cars', body, this.headers)
//     }
// }

// export default new CarApi()
