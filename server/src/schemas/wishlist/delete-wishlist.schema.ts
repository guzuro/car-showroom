import { body } from "express-validator";

export const deleteWishlistSchema = [
    body('id')
        .exists()
        .withMessage('"id" field required')
        .isInt()
        .withMessage('"id" field must be int'),
]