import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(e: HttpException, req: Request, res: Response, next: NextFunction) {

    const status = e.status || 500;
    const message = e.message || 'Something goes wrong';

    res
        .status(status)
        .send({
            message
        })
}

export default errorMiddleware