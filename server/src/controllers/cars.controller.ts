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


export const carsByModel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await httpCLient.get('cars', req.query)
        console.log(data, 'data');

        res.statusCode = 200;
        res.send(
            data
        )
    } catch (error: unknown) {
        console.log(error, 'error');
        if (isAxiosError(error)) {
            const axiosError: AxiosError = error

            next(new HttpException(Number.parseInt(error.code!), axiosError.message))
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
