

import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

export enum PlotType {
    "residential",
    "commercial",
    "utility",
}

export enum SizeCategory {
    "3.5 marla",
    "5 marla",
    "7 marla",
    "10 marla",
    "1 kanal",
}

@Entity('allotments')
export class Allotment extends BaseModel {

    @Column({ type: "int", nullable: false })
    number_of_owners?: number

    @Column({ length: 200 })
    block?: string

    @Column({ length: 200, nullable: false, unique: true })
    note_number!: string

    @Column({ length: 200, nullable: false })
    plot_number!: string

    @Column({ length: 200 })
    kanal?: string

    @Column({ length: 200 })
    marla?: string

    @Column({ length: 200 })
    square_yard?: string

    @Column({ type: "bool", default: false })
    corner!: boolean

    @Column({ type: "bool", default: false })
    completion_certificate!: boolean

    @Column({ type: "bool", default: false })
    court_case!: boolean

    @Column({ length: 1000, nullable: true })
    attachment?: string

    @Column({ length: 200, nullable: false })
    plot_type!: string

    @Column({ length: 200, nullable: false })
    size_category!: string

    // @Column({
    //     type: "enum", enum: PlotType, default: PlotType.residential
    // })
    // plot_type!: PlotType

    // @Column({ type: "enum", enum: SizeCategory, default: SizeCategory["3.5 marla"] })
    // size_category!: SizeCategory

    /**
     * Allottee details
     */

    @Column({ length: 200, nullable: true })
    member_share?: string

    @Column({ length: 200, nullable: true })
    full_name?: string

    @Column({ length: 200, nullable: true })
    cnic_no?: string

    @Column({ length: 200, nullable: true })
    relationship_type?: string

    @Column({ length: 200, nullable: true })
    guardian_name?: string

    @Column({ type: 'date', nullable: true })
    date_of_birth?: string

    @Column({ length: 200, nullable: true })
    gender?: string

    @Column({ length: 200, nullable: true })
    address?: string

    @Column({ length: 200, nullable: true })
    city?: string

    @Column({ length: 200, nullable: true })
    email?: string

    @Column({ length: 200, nullable: true })
    phone_no?: string

    @Column({ length: 200, nullable: true })
    photo?: string

    @Column({ length: 200, nullable: true })
    cnic_front?: string

    @Column({ length: 200, nullable: true })
    cnic_back?: string


    /**
     * Costing details
     */

    @Column({ length: 200, nullable: true })
    rate_per_marla?: string

    @Column({ length: 200, nullable: true })
    development_charges?: string

    @Column({ length: 200, nullable: true })
    special_adjustment?: string

    @Column({ length: 200, nullable: true })
    rebait_amount?: string

    @Column({ length: 200, nullable: true })
    dealer_commision?: string

    @Column({ type: 'json', nullable: true })
    installments?: string


    /**
     * Agent details
     */

    @Column({ length: 200, nullable: true })
    agent_name?: string

    @Column({ length: 200, nullable: true })
    agent_cnic?: string


}