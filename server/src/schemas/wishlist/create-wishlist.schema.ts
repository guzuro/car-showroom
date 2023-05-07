import { body } from "express-validator";

export const createWithlistSchema = [
    body('name')
        .exists()
        .withMessage('"name" field required')
        .trim()
        .escape(),
    body('userId')
        .exists()
        .withMessage('"userId" field required')
        .isInt()
        .withMessage('"userId" field must be int'),
]