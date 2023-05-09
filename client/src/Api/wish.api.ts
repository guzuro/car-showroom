import HttpClient from "./HttpClient"

class WishApi extends HttpClient {
    constructor() {
        super()
    }

    async addToWishList(body: any) {
        return await this.post<Array<any>>('/wish/add', body)
    }

    async removeFromWishList({ id }: any, params?: Record<string, any>) {
        return await this.delete<Array<any>>(`/wish/delete/${id}`, params)
    }
}

export default new WishApi()
