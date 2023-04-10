import { body } from 'express-validator';

export const createUserSchema = [
    body('login')
        .exists()
        .withMessage('Login required')
        .trim()
        .escape(),
    body('email')
        .exists()
        .withMessage('Email required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email wrong format')
        .exists()
        .escape(),
    body('password')
        .exists()
        .withMessage('Password required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 chars long')
        .exists()
        .escape(),
]