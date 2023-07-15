

import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";


@Entity('agents')
export class Agent extends BaseModel {


    @Column({ length: 200, nullable: true })
    agent_name?: string

    @Column({ length: 200, unique: true,  nullable: false })
    agent_phone!: string

    @Column({ length: 200, nullable: true })
    agent_cnic?: string

}