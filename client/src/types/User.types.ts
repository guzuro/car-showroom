import type { Wishlist } from './Wishlist.type'

export type User = {
  id: number
  firstName: string
  lastName: string
  login: string
  email: string
  wishes: Array<Wishlist>
  createdAt: string
  updatedAt: string
}
