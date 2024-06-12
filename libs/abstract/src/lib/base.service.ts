import { BaseRepository } from './base.repository';
import { BaseEntity } from './base.entity';
import { EntityDTO, FilterQuery, FromEntityType, RequiredEntityData, wrap } from '@mikro-orm/postgresql';
import { PaginationDto } from '@henshi/types';

export abstract class BaseService<
    Entity extends BaseEntity,
    CreateDto extends RequiredEntityData<Entity>,
    UpdateDto extends Partial<EntityDTO<FromEntityType<Entity>>>,
> {
    protected queryAlias: string = 'entity';
    protected searchBy: string[] = ['name'];

    protected constructor(private readonly repository: BaseRepository<Entity>) {}

    async create(dto: CreateDto) {
        const entity = this.repository.create(dto);

        await this.repository.getEntityManager().persistAndFlush(entity);

        return entity;
    }

    async findAll(dto: PaginationDto) {
        const qb = this.repository.createQueryBuilder(this.queryAlias);

        return this.repository.paginateByOffset(qb, dto, this.queryAlias, this.searchBy);
    }

    async findOne(query: Partial<Entity>) {
        return this.repository.findOne(query);
    }

    async update(id: string, dto: UpdateDto) {
        const entity = await this.repository.findOne({ id } as FilterQuery<Entity>);

        if (!entity) return;

        this.repository.assign(entity as Entity, dto);
        await this.repository.getEntityManager().flush();

        return entity;
    }

    async delete(id: string) {
        const entity = await this.repository.findOne({ id } as FilterQuery<Entity>);

        if (!entity) return;

        await this.repository.getEntityManager().removeAndFlush(entity);
    }

    async deleteMany(ids: string[]) {
        const filteredIds = ids.filter((id) => !!id);

        const entities = await this.repository.find({
            id: {
                $in: filteredIds,
            },
        } as any);

        await this.repository.getEntityManager().removeAndFlush(entities);
    }
}
