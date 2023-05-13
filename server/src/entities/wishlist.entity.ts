import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Wish } from "./wish.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class WishList {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        default: false
    })
    isDefault!: boolean

    @Column({
        default: null
    })
    shareKey!: string

    @Column({ name: 'user_id', select: false })
    userId!: number

    @ManyToOne(
        () => User, (user) => user.wishes,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: 'user_id' })
    user!: User

    @Column()
    name!: string

    @OneToMany(
        () => Wish, (wish) => wish.list,
    )
    items?: Array<Wish>

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    generateGuid() {
        if (this.shareKey === null) {
            this.shareKey = uuidv4()
        }
    }
}
