

import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

enum RelationshipType {
    "son of",
    "daughter of",
    "wife of",
    "widow of"
}

enum Gender {
    "male",
    "female",
    "other"
}

@Entity('alottees')
export class Alottee extends BaseModel {

    @Column({ length: 1000, nullable: true })
    photo!: string

    @Column({ length: 1000, nullable: true })
    cnic_front!: string

    @Column({ length: 1000, nullable: true })
    cnic_back!: string

    @Column({ length: 500, nullable: true })
    member_share!: string

    @Column({ length: 500, nullable: false })
    full_name?: string

    @Column({ length: 500, nullable: false })
    guardian_name?: string

    @Column({ type: "date", nullable: false })
    date_of_birth!: string

    @Column({ type: "enum", enum: RelationshipType, default: RelationshipType["son of"] })
    relationship_type!: RelationshipType

    @Column({ type: "enum", enum: Gender, default: Gender.male })
    gender!: Gender

    @Column({ length: 1000, nullable: false })
    address!: string

    @Column({ length: 500, nullable: false })
    city!: string

    @Column({ length: 500, nullable: false, unique: true })
    email!: string

    @Column({ length: 200, nullable: false, unique: true })
    phone!: string


}