import { WishList } from "../../entities/wishlist.entity";

export type CreateWishlistDto = Pick<WishList, "name" | "userId">
