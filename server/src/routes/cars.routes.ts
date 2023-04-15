import express from "express";
import { carsByModel, randomCars } from "../controllers/cars.controller";

const router = express.Router()


router.get('/carsbymodel', carsByModel)
router.get('/randomcars', randomCars)

// router.post('/login', validation(loginUserSchema), loginUserHandler)

// router.post('/refresh')


export default router
