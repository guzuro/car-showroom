import express from "express";
import { validation } from "../middlewares/validation";
import { createWithlistSchema } from "../schemas/wishlist/create-wishlist.schema";
import { addToWishlistHandler, createListHandler, removeListHandler } from "../controllers/wishlist.controller";
import { deleteWishlistSchema } from "../schemas/wishlist/delete-wishlist.schema";

const router = express.Router()

router.post('/create', validation(createWithlistSchema), createListHandler)

router.delete('/delete/:id', validation(deleteWishlistSchema), removeListHandler)

router.post('/addtowishlist', addToWishlistHandler)

export default router
