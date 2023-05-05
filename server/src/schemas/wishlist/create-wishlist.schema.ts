import { body } from "express-validator";

export const createWithlistSchema = [
    body('name')
        .exists()
        .withMessage('Login required')
        .trim()
        .escape(),
]