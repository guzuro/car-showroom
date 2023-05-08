import express from "express";
import { addToWishlistHandler } from "../controllers/wish.controller";
import { validation } from "../middlewares/validation";
import { addWishSchema } from "../schemas/wish/add-wish.schema";

const router = express.Router()

router.post('/add', validation(addWishSchema), addToWishlistHandler)

// router.delete('/delete/:id', validation(deleteWishlistSchema), removeListHandler)

export default router
