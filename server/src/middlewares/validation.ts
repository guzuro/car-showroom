import express from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validation = (schemas: Array<ValidationChain>): express.RequestHandler => {
    return async (req, res, next) => {

        await Promise.all(schemas.map(schema => schema.run(req)));

        const validation = validationResult(req)

        if (validation.isEmpty()) return next()

        res
            .status(400)
            .send({
                message: validation.array().map(err => err.msg).join(', ')
            })
    }
}