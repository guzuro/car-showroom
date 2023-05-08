import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import TypeOrmException from "../exceptions/TypeOrmException"
import { addToWishlist, getWishByCarIndex } from "../repositories/wish.repository";
import { getWishlistById } from "../repositories/wishlist.repository";

export const addToWishlistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const wish = await getWishByCarIndex({ ...body })

        if (wish) {
            next(new HttpException(409, "Already exists in wishlist"))
        } else {

            await addToWishlist({ ...body })

            const wishlist = await getWishlistById({
                id: body.listId
            })

            res
                .status(200)
                .send({
                    message: 'Added to list',
                    wishlist,
                })
        }
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}

