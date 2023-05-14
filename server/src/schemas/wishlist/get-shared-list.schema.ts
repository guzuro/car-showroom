import { param } from "express-validator";

export const getSharedListSchema = [
    param('id')
        .exists()
        .withMessage('"id" param required')
]