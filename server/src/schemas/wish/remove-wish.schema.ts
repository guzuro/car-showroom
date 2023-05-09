import { param, query } from "express-validator";

export const removedWishSchema = [
    param('id')
        .exists()
        .withMessage('"id" field required')
        .isInt()
        .withMessage('"id" field must be int'),
    query('listId')
        .exists()
        .withMessage('"listId" field required')
        .isInt()
        .withMessage('"listId" field must be int'),

]