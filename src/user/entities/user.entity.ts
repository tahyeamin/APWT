
import {
    Entity,
    PrimaryColumn,
    Column,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('users')
export class User {
    @PrimaryColumn('varchar', { length: 36 })
    id: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fullName: string | null;

    @Column({ type: 'bigint', unsigned: true })
    phone: string; // TypeORM stores bigint as string

    

    @BeforeInsert()
    generateId() {
        this.id = randomUUID();
    }
}