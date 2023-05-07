import { Request, Response, NextFunction } from "express";
import TypeOrmException from "../exceptions/TypeOrmException";
import { createWishlist, deleteWishlist, getUserWishlists } from "../repositories/wishlist.repository";

export const createListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createWishlist({
            ...req.body
        })

        const wishList = await getUserWishlists({ userId: req.body.userId })

        res
            .status(200)
            .send({
                message: 'List created!',
                wishList,
            })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


export const removeListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteWishlist({
            id: req.body.wishlistId
        })

        res
            .status(200)
            .send({
                message: 'list removed!',
            })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}