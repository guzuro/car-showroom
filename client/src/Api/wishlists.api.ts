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

    async deleteWishlist(id: number) {
        return await this.delete<BaseApiRes>(`/wishlist/delete/${id}`)
    }

    async generateShareKey(body: Pick<Wishlist, "id">) {
        return await this.post<BaseApiRes<WishlistApiRes>>('/wishlist/generateShareKey', body)
    }
}

export default new WishListsApi()
