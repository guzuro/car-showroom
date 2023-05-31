import type { Wish } from '../types/Wish.type'
import type { WishlistApiRes } from '../types/Wishlist.type'
import HttpClient from './HttpClient'
import type { BaseApiRes } from './types/BaseApiRes'

type RemoveWishQuery = {
  listId: number
}

export type ReqAddWish = Omit<Wish, 'id'> & {
  listId: number
}

class WishApi extends HttpClient {
  constructor() {
    super()
  }

  async addToWishList(body: ReqAddWish) {
    return await this.post<BaseApiRes<WishlistApiRes>>('/wish/add', body)
  }

  async removeFromWishList(id: number, params: RemoveWishQuery) {
    return await this.delete<BaseApiRes<WishlistApiRes>>(`/wish/delete/${id}`, params)
  }
}

export default new WishApi()
