import { Entity, Enum, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from '@henshi/abstract';

export enum UserRole {
    FREE_USER,
    ADMIN,
}

@Entity()
export class User extends BaseEntity {
    @Property({ length: 255 })
    name: string;

    @Index()
    @Property({ unique: true, length: 255 })
    email: string;

    @Property({ hidden: true })
    password: string;

    @Enum(() => UserRole)
    role: UserRole = UserRole.FREE_USER;

    @Property()
    emailConfirmed: boolean = false;

    @Property({ nullable: true })
    refreshToken?: string;
}
