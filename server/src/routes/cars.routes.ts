import express from "express";
import { createUserSchema } from "../schemas/auth/create-user.schema";
import { loginUserSchema } from "../schemas/auth/login-user.schema";
import { validation } from "../middlewares/validation";
import { carsByModel } from "../controllers/cars.controller";

const router = express.Router()


router.get('/carsbymodel', carsByModel)

// router.post('/login', validation(loginUserSchema), loginUserHandler)

// router.post('/refresh')


export default router
