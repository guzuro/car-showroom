import { body } from "express-validator";
import { CarModel } from "../../entities/wish.entity";

export const addWishSchema = [
    body('listId')
        .exists()
        .withMessage('"listId" field required')
        .isInt()
        .withMessage('"listId" field must be int'),
    body("carModel")
        .exists()
        .withMessage('"carModel" field required')
        .isIn(Object.keys(CarModel))
        .withMessage(`carModel must be one of ${Object.keys(CarModel)}`),
    body("carIndex")
        .exists()
        .withMessage('"carIndex" field required')
        .isInt()
        .withMessage('"carIndex" field must be int'),
]