import { Not } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CreateWishlistDto } from "../dto/Wishlist/create-wishlist.dto";
import { DeleteWishlistDto } from "../dto/Wishlist/delete-wishlist.dto";
import { GetUserWishlists } from "../dto/Wishlist/get-user-wishlists.dto";
import { GetWishListById } from "../dto/Wishlist/get-wishlist-by-id.dto";
import { GetWishListByShareKeyDto } from "../dto/Wishlist/get-wishlist-by-sharekey.dto.";
import { UpdateListDefaultDto } from "../dto/Wishlist/update-list-default.dto.";
import { WishList } from "../entities/wishlist.entity";

const wishlistRepository = AppDataSource.getRepository(WishList);

export const createWishlist = async (newList: CreateWishlistDto) => {
    return await wishlistRepository.save({ ...newList })
}

export const deleteWishlist = async (id: DeleteWishlistDto) => {
    return await wishlistRepository.delete(id)
}

export const getWishlistById = async ({ id }: GetWishListById) => {
    return await wishlistRepository.findOne({
        where: {
            id
        },
        relations: ['items']
    })
}

export const getWishlistByShareKey = async (shareKey: GetWishListByShareKeyDto) => {
    return await wishlistRepository.findOne({
        where: {
            shareKey
        },
        relations: ['items']
    })
}

export const updateWishlist = async (updatedList: WishList) => {
    return await wishlistRepository.save({
        ...updatedList
    })
}

export const getUserWishlists = async ({ userId }: GetUserWishlists) => {
    return await wishlistRepository.find({
        where: {
            userId
        },
        order: {
            isDefault: "DESC",
            createdAt: "DESC"
        },
        relations: ['items'],
    })
}

export const setWishlistAsDefault = async ({ id }: UpdateListDefaultDto) => {

    return wishlistRepository.manager.transaction(async (manager) => {
        const list = await manager.findOneBy(WishList, { id })

        if (list) {

            if (!list.isDefault) {
                list.isDefault = true
                const updatedList = await manager.save(WishList, list)

                await manager.createQueryBuilder()
                    .update(WishList)
                    .set({ isDefault: false })
                    .where({
                        userId: list.userId,
                        id: Not(list.id)
                    })
                    .execute()

                return updatedList
            } else {
                list.isDefault = false
                return await manager.save(WishList, list)
            }
        } else {
            return null
        }
    })

}