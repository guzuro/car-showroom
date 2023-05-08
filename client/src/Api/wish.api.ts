import type { Wishlist } from "../types/Wishlist.type"
import HttpClient from "./HttpClient"

type CreateWishlistRes = {
    message: string,
    wishlist: Wishlist
}

class WishApi extends HttpClient {
    constructor() {
        super()
    }

    async addToWishList(body: any) {
        return await this.post<Array<any>>('/wish/add', body)
    }

    async addWishFromList(body: any) {
        return await this.post<CreateWishlistRes>('/wishlist/create', body)
    }
}

export default new WishApi()
