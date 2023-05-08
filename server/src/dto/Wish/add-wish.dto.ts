import { Wish } from "../../entities/wish.entity";

export type AddWishDto = Pick<Wish, "listId" | "carIndex" | "carModel">
