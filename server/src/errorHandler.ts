import { Response } from 'express';
import { TypeORMError } from 'typeorm';
import { DUPLICATE_KEY_CODE } from './constants';

export const errorHandler = async (error: any, res: Response) => {
    if (error instanceof TypeORMError) {
        const ormError: any = error;

        if (ormError.code === DUPLICATE_KEY_CODE) {
            res.statusCode = 409;

            return res.json({
                error: ormError.detail
            })
        }
    }

    res.statusCode = 500;
    return res.json({
        error: error.message
    })
}