import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Wish } from "./wish.entity";

@Entity()
export class WishList {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'user_id' })
    userId!: number

    @ManyToOne(() => User, (user) => user.wishes)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @OneToMany(() => Wish, (wish) => wish.list)
    items?: Array<Wish>

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}