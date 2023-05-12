import type { Wish } from "./Wish.type"

export type Wishlist = {
    id: number,
    name: string
    isDefault: boolean
    shareLink: string | null
    items: Array<Wish>
    createdAt: string,
    updatedAt: string
}


export type WishlistApiRes = {
    wishlist: Wishlist
}