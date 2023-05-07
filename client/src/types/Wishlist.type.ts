import type { Wish } from "./Wish.type"

export type Wishlist = {
    id: number,
    items: Array<Wish>
    createdAt: string,
    updatedAt: string
}

export const enum WishlistAddFrontendActions {
    NEED_AUTH,
    WISHLIST_EMPTY,
    SELECT_WISHLIST_TO_ADD
}