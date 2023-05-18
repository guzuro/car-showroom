import express from "express";
import { validation } from "../middlewares/validation";
import { createWithlistSchema } from "../schemas/wishlist/create-wishlist.schema";
import { createListHandler, generateShareKeyHandler, getSharedListHandler, removeListHandler, toggleWishlistDefault } from "../controllers/wishlist.controller";
import { deleteWishlistSchema } from "../schemas/wishlist/delete-wishlist.schema";
import { generateShareKeySchema } from "../schemas/wishlist/generate-share-key.schema";
import { getSharedListSchema } from "../schemas/wishlist/get-shared-list.schema";
import { updateWishlistIsDefault } from "../schemas/wishlist/update-wishlist-is-default.schema";

const router = express.Router()

router.post('/create', validation(createWithlistSchema), createListHandler)

router.post('/generateShareKey', validation(generateShareKeySchema), generateShareKeyHandler)

router.delete('/delete/:id', validation(deleteWishlistSchema), removeListHandler)

router.get('/shared/:id', validation(getSharedListSchema), getSharedListHandler)

router.post('/toggleDefault', validation(updateWishlistIsDefault), toggleWishlistDefault)

export default router
