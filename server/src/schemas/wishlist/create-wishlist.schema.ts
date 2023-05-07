import { body } from "express-validator";

export const createWithlistSchema = [
    body('name')
        .exists()
        .withMessage('"name" field required')
        .trim()
        .notEmpty()
        .withMessage('"name" must be filled')
        .escape(),
    body('userId')
        .exists()
        .withMessage('"userId" field required')
        .isInt()
        .withMessage('"userId" field must be int'),
]