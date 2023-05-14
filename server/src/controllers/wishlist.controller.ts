import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import TypeOrmException from "../exceptions/TypeOrmException";
import { createWishlist, deleteWishlist, getUserWishlists, getWishlistById, getWishlistByShareKey, updateWishlist } from "../repositories/wishlist.repository";
import { getUserById } from "../repositories/user.repository";

export const createListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wishlist = await createWishlist({
            ...req.body
        })

        res
            .status(200)
            .send({
                message: 'Wishlist created!',
                wishlist: wishlist.omitUserId(),
            })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


export const removeListHandler = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number.parseInt(req.params.id)

    try {
        await deleteWishlist({ id })

        res
            .status(200)
            .send({
                message: 'Wishlist removed!',
            })
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


export const generateShareKeyHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await getWishlistById({
            ...req.body
        })


        if (list) {
            list.generateGuid()

            const { id, shareKey } = list

            const updatedList = await updateWishlist(list)

            console.log(updatedList, 'updatedList');


            res
                .status(200)
                .send({
                    message: 'Wishlist updated!',
                    wishlist: updatedList.omitUserId()
                })
        } else {
            next(new HttpException(404, "Wishlist not found!"))
        }


    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


export const getSharedListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shareKey = req.params.id

        const list = await getWishlistByShareKey(shareKey)

        if (list) {
            const user = await getUserById(list.userId)

            if (user) {
                res
                    .status(200)
                    .send({
                        userInfo: user.omitPassword(),
                        wishlist: list.omitUserId()
                    })
            } else {
                next(new HttpException(404, "User not found!"))
            }
        } else {
            next(new HttpException(404, "Wishlist not found!"))
        }
    } catch (error: any) {
        next(new TypeOrmException(error))
    }
}


