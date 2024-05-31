import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

export enum UserRole {
    FREE_USER = 'FREE_USER',
    BASIC_USER = 'BASIC_USER',
    PREMIUM_USER = 'PREMIUM_USER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 255 })
    name: string;

    @Index({ unique: true })
    @Column({ unique: true, length: 255 })
    email: string;

    @Column()
    password: string;

    @Column({ type: "varchar", enum: UserRole, default: UserRole.FREE_USER })
    role: UserRole;

    @Column({ default: false })
    emailConfirmed: boolean;

    @Column({ nullable: true })
    refreshToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

