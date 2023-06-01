

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

@Entity('alloatments')
export class Allotment extends BaseModel {

    @Column({ length: 200, nullable: false, unique: true })
    note_number!: string

    @Column({ length: 200, nullable: false })
    plot_number!: string

    @Column({ length: 200 })
    block?: string

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

    @Column({
        type: "enum", enum: PlotType, default: PlotType.residential
    })
    plot_type!: PlotType

    @Column({ type: "enum", enum: SizeCategory, default: SizeCategory["3.5 marla"] })
    size_category!: SizeCategory


}