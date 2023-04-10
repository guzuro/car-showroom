import { body } from 'express-validator';

export const loginUserSchema = [
    body('login')
        .exists()
        .withMessage('Login required')
        .trim()
        .escape(),
    body('password')
        .exists()
        .withMessage('Password required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 chars long')
        .exists()
        .escape(),
]