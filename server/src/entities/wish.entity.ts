import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { WishList } from './wishlist.entity';


export enum CarModel {
    volkswagen = 'volkswagen',
    toyota = 'toyota',
    kia = 'kia',
    audi = 'audi'
}

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'list_id', select: false })
    listId!: number

    @ManyToOne(() => WishList, (list) => list.items)
    @JoinColumn({ name: 'list_id' })
    list?: WishList

    @Column()
    carIndex!: number

    @Column({
        type: "enum",
        enum: CarModel,
    })
    carModel!: string
}
