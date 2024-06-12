import { EntityRepository, QueryBuilder } from '@mikro-orm/postgresql';
import { BaseEntity } from './base.entity';
import { PaginatedResponse, PaginationDto, PaginationMeta } from '@henshi/types';

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
    async paginateByOffset(
        qb: QueryBuilder<T>,
        dto: PaginationDto,
        alias: string,
        searchBy: string[],
    ): Promise<PaginatedResponse<T>> {
        const { search, sort, order, page, itemsPerPage, fields, relations } = dto;

        if (search) {
            searchBy.forEach((column) => {
                qb.orWhere({
                    [column]: {
                        $ilike: `%${search}%`,
                    },
                });
            });
        }

        if (relations) {
            for (const relation of relations) qb.leftJoinAndSelect(`${alias}.${relation}`, `${alias}_${relation}`);
        }

        qb.orderBy({ [sort]: order.toLowerCase() })
            .limit(parseInt(itemsPerPage))
            .select(fields)
            .offset((parseInt(page) - 1) * parseInt(itemsPerPage));

        const [data, count] = await qb.getResultAndCount();

        return new PaginatedResponse<T>(data, new PaginationMeta(dto, count));
    }
}
