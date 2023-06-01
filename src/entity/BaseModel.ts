import { BaseEntity, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string | null;

    @CreateDateColumn()
    created_at?: Date | null;

    @UpdateDateColumn()
    updated_at?: Date | null;


}