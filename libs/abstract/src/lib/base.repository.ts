import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { BaseEntity } from './base.entity';
import { PaginatedResponse, PaginationDto, PaginationMeta } from '@henshi/types';

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
    async paginateByOffset(qb: QueryBuilder<T>, alias: string, dto: PaginationDto): Promise<PaginatedResponse<T>> {
        const { search, searchBy, sort, order, itemsPerPage, fields, offset, relations } = dto;

        if (search && searchBy) {
            qb.andWhere({
                [searchBy]: {
                    $ilike: `%${search}%`,
                },
            });
        }

        if (relations) {
            for (const relation of relations) qb.leftJoinAndSelect(`${alias}.${relation}`, `${alias}_${relation}`);
        }

        qb.orderBy({ [sort]: order.toLowerCase() })
            .limit(parseInt(itemsPerPage))
            .select(fields)
            .offset(offset);

        const [data, count] = await qb.getResultAndCount();

        return new PaginatedResponse<T>(data, new PaginationMeta(dto, count));
    }
}
