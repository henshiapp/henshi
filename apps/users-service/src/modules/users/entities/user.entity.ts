import { BeforeCreate, BeforeUpdate, Entity, Enum, EventArgs, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from '@henshi/abstract';
import * as argon2 from 'argon2';

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

    @BeforeCreate()
    @BeforeUpdate()
    async encryptPassword(args: EventArgs<this>) {
        if (args.changeSet.payload.password) {
            this.password = await argon2.hash(this.password);
        }
    }

    comparePasswords(password: string) {
        return argon2.verify(this.password, password);
    }
}
