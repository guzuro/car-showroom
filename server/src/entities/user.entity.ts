import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Unique } from 'typeorm';

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
    password!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
