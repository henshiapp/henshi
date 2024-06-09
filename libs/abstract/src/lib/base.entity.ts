import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { randomUUID } from 'crypto';

@Entity({ abstract: true })
export abstract class BaseEntity {
    @PrimaryKey({ type: 'uuid' })
    id: string = randomUUID();

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
