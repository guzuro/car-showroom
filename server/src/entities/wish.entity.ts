import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { WishList } from './wishlist.entity';

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id!: number


    @Column({ name: 'list_id' })
    listId!: number

    @ManyToOne(() => WishList, (list) => list.items)
    @JoinColumn({ name: 'list_id' })
    list?: WishList

    @Column({ type: 'jsonb' })
    cars?: Array<{
        model: string,
        index: number
    }>
}
