import type { Wishlist, WishlistApiRes } from "../types/Wishlist.type"
import HttpClient from "./HttpClient"
import type { BaseApiRes } from "./types/BaseApiRes"

type CreateWishlistReq = Pick<Wishlist, "name"> & {
    userId: number
}

class WishListsApi extends HttpClient {
    constructor() {
        super()
    }

    async createWishlist(body: CreateWishlistReq) {
        return await this.post<BaseApiRes<WishlistApiRes>>('/wishlist/create', body)
    }

    //TODO 
    // async deleteWishlist(body: any) {
    //     return await this.delete<any>('/wishlist/delete', body)
    // }
}

export default new WishListsApi()
