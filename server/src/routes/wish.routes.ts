import express from "express";
import { addToWishlistHandler, removeFromWishlistHandler } from "../controllers/wish.controller";
import { validation } from "../middlewares/validation";
import { addWishSchema } from "../schemas/wish/add-wish.schema";
import { removedWishSchema } from "../schemas/wish/remove-wish.schema";

const router = express.Router()

router.post('/add', validation(addWishSchema), addToWishlistHandler)

router.delete('/delete/:id', validation(removedWishSchema), removeFromWishlistHandler)

export default router
