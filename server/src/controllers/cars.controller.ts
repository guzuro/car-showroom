import { Request, Response, NextFunction } from "express";
import HttpClient from "./HttpClient";
import { AxiosError, isAxiosError } from "axios";
import HttpException from "../exceptions/HttpException";
import setLoopIndex from "../logic/setIndex";
import { CarInfo } from "../types/CardInfo.type";

const httpCLient = new HttpClient({
  baseURL: "https://api.api-ninjas.com/v1/",
  headers: {
    "X-Api-Key": process.env.CAR_API_KEY,
  },
});

export const randomCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getRequests = [
      httpCLient.get<Array<CarInfo>>("cars", { make: "audi" }),
      httpCLient.get<Array<CarInfo>>("cars", { make: "kia" }),
      httpCLient.get<Array<CarInfo>>("cars", { make: "toyota" }),
      httpCLient.get<Array<CarInfo>>("cars", { make: "volkswagen" }),
    ];

    const cars = await (
      await Promise.all(getRequests)
    )
      .map(({ data }) => data)
      .map((data) => data.map(setLoopIndex))
      .flat()
      .sort(() => Math.random() - Math.random())
      .slice(0, 10);

    res.status(200).send(cars);
  } catch (error: unknown) {
    console.log(error, "error");

    if (isAxiosError(error)) {
      const axiosError: AxiosError = error;

      next(
        new HttpException(error.response?.status ?? 500, axiosError.message)
      );
    } else {
      next(new HttpException(500, ""));
    }
  }
};

export const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = await httpCLient.get<Array<CarInfo>>("cars", {
      ...req.query,
    });
    const indexedCars = data.map(setLoopIndex);

    res.status(200).send(indexedCars);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError: AxiosError = error;

      next(new HttpException(error.response?.status!, axiosError.message));
    } else {
      next(new HttpException(500, ""));
    }
  }
};
