import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";


@Entity('users')
export class User extends BaseModel {

    @Column({
        type: "varchar",
        length: 500
    })
    name!: string

    @Column({
        type: "varchar",
        length: 200,
        unique: true,
        nullable: false
    })
    email!: string 

    @Column({
        type: "varchar",
        length: 200,
        unique: true,
        nullable: false
    })
    username!: string

    @Column({
        type: "varchar",
        length: 200,
        unique: true
    })
    phone?: string

    @Column({
        type: "varchar",
        length: 200
    })
    role?: string

    @Column("text", { array: true, default: [] })
    privileges!: string[]

    @Column({ type: "bool", default: false })
    enabled!: boolean


    @Column({
        type: "varchar",
        length: 1000,
        nullable: true,
        default: null
    })
    secrete?: string

    @Column({
        type: "varchar",
        length: 1000,
        nullable: true,
        default: null
    })
    password?: string


    @Column({
        type: "varchar",
        length: 6,
        nullable: true,
        default: null
    })
    otp?: string

    @Column({
        type: "date",
        nullable: true,
    })
    otp_expiry?: string

}