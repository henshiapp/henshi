import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString({ each: true })
    fields: string[] = [];

    @IsOptional()
    @IsString({ each: true })
    relations: string[] = [];

    @IsOptional()
    @IsNumberString()
    page: string = '1';

    // TODO: use class-transformer to string -> number

    @IsOptional()
    @IsNumberString()
    itemsPerPage: string = '10';

    @IsOptional()
    @IsString()
    sort: string = 'createdAt';

    @IsOptional()
    @IsString()
    order: string = 'desc';
}

export class PaginationMeta {
    readonly page: number;

    readonly itemsPerPage: number;

    readonly itemsTotal: number;

    readonly itemsCount: number;

    readonly pageCount: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor(pageOptionsDto: PaginationDto, itemCount: number) {
        this.page = parseInt(pageOptionsDto.page);
        this.itemsPerPage = parseInt(pageOptionsDto.itemsPerPage);
        this.itemsCount = itemCount;
        this.pageCount = Math.ceil(this.itemsTotal / this.itemsPerPage);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}

export class PaginatedResponse<T> {
    readonly data: T[];
    readonly meta: PaginationMeta;

    constructor(data: T[], meta: PaginationMeta) {
        this.data = data;
        this.meta = meta;
    }
}
