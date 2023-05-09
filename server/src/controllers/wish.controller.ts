import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import TypeOrmException from "../exceptions/TypeOrmException"
import { addToWishlist, getWishByCarIndex, removeWish } from "../repositories/wish.repository";
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

export const removeFromWishlistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params;
        const query = req.query;

        const wishId = Number.parseInt(params.id)
        const listId = Number.parseInt(query.listId!.toString()!)

        const result = await removeWish({ id: wishId })

        if (result.affected === 0) {
            next(new HttpException(404, "Nothing to delete"))
        } else {

            const wishlist = await getWishlistById({
                id: listId
            })

            res
                .status(200)
                .send({
                    message: 'Removed from list',
                    wishlist
                })
        }

    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


