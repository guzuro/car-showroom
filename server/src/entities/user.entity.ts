import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Unique, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Wish } from './wish.entity';
import { WishList } from './wishlist.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'id' })
    id!: number

    @Column({ nullable: true, })
    firstName!: string

    @Column({ nullable: true, })
    lastName!: string

    @Unique('UQ_login', ['login'])
    @Column()
    login!: string

    @Unique('UQ_email', ['email'])
    @Column()
    email!: string

    @Column()
    password?: string

    @OneToMany(() => WishList, (list) => list.user)
    wishes!: WishList[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    omitPassword() {
        const { password, ...fields } = this

        return fields
    }
}
