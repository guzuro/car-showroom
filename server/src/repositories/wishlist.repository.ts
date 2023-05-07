import { AppDataSource } from "../config/data-source";
import { CreateWishlistDto } from "../dto/Wishlist/create-wishlist.dto";
import { DeleteWishlistDto } from "../dto/Wishlist/delete-wishlist.dto";
import { GetUserWishlists } from "../dto/Wishlist/get-user-wishlists.dto";
import { GetWishListById } from "../dto/Wishlist/get-wishlist-by-id.dto";
import { WishList } from "../entities/wishlist.entity";

const wishlistRepository = AppDataSource.getRepository(WishList);

export const createWishlist = async (newList: CreateWishlistDto) => {
    return await wishlistRepository.save({ ...newList })
}

export const deleteWishlist = async (id: DeleteWishlistDto) => {
    return await wishlistRepository.delete(id)
}

export const getWishlistById = async ({ id }: GetWishListById) => {
    return await wishlistRepository.find({
        where: {
            id
        },
        relations: ['items']
    })
}

export const getUserWishlists = async ({ userId }: GetUserWishlists) => {
    return await wishlistRepository.find({
        where: {
            userId
        },
        relations: ['items'],
        order: {
            createdAt: "DESC",
            updatedAt: "DESC"
        }
    })
}