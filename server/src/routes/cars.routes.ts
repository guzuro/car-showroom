import express from "express";
import { carsByModel, randomCars } from "../controllers/cars.controller";

const router = express.Router()


router.get('/carsbymodel', carsByModel)
router.get('/randomcars', randomCars)


export default router
