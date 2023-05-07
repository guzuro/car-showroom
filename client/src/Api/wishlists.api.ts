import type { Wishlist } from "../types/Wishlist.type"
import HttpClient from "./HttpClient"

type CreateWishlistRes = {
    message: string,
    wishlist: Wishlist
}

class WishListsApi extends HttpClient {
    constructor() {
        super()
    }

    async getUserWishlists(body: any) {
        return await this.post<Array<any>>('/wishlist/login', body)
    }

    async createWishlist(body: any) {
        return await this.post<CreateWishlistRes>('/wishlist/create', body)
    }

    async deleteWishlist(body: any) {
        return await this.delete<any>('/wishlist/delete', body)
    }
}

export default new WishListsApi()
