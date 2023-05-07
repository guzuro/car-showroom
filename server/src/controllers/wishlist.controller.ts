import { Request, Response, NextFunction } from "express";
import TypeOrmException from "../exceptions/TypeOrmException";
import { createWishlist, deleteWishlist, getUserWishlists } from "../repositories/wishlist.repository";

export const createListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wishlist = await createWishlist({
            ...req.body
        })

        res
            .status(200)
            .send({
                message: 'List created!',
                wishlist,
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

export const addToWishlistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res
            .status(500)
            .send({
                message: 'NOT IMPLEMENTED!',
            })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}

