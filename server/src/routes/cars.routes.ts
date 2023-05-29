import express from "express";
import { getCars, randomCars } from "../controllers/cars.controller";

const router = express.Router()


router.get('/getcars', getCars)
router.get('/randomcars', randomCars)


export default router
