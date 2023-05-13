import { param } from "express-validator";

export const deleteWishlistSchema = [
    param('id')
        .exists()
        .withMessage('"id" field required')
        .isInt()
        .withMessage('"id" field must be int'),
]