import { AppDataSource } from "../config/data-source";
import { AddWishDto } from "../dto/Wish/add-wish.dto";
import { Wish } from "../entities/wish.entity";

const wishRepository = AppDataSource.getRepository(Wish);

export const addToWishlist = async (wish: AddWishDto) => {

    //todo: check if this car already exists in db
    return await wishRepository.save({
        ...wish
    })
}

export const getWishByCarIndex = async ({ listId, carIndex, carModel }: AddWishDto) => {

    //todo: check if this car already exists in db
    return await wishRepository.findOneBy({
        listId,
        carIndex,
        carModel
    })
}