import { AppDataSource } from "../config/data-source";
import { AddWishDto } from "../dto/Wish/add-wish.dto";
import { RemoveWishDto } from "../dto/Wish/remove-wish.dto";
import { Wish } from "../entities/wish.entity";

const wishRepository = AppDataSource.getRepository(Wish);

export const addToWishlist = async (wish: AddWishDto) => {

    return await wishRepository.save({
        ...wish
    })
}

export const getWishByCarIndex = async ({ listId, carIndex, carModel }: AddWishDto) => {

    return await wishRepository.findOneBy({
        listId,
        carIndex,
        carModel
    })
}

export const removeWish = async ({ id }: RemoveWishDto) => {
    return await wishRepository.delete(id)
}