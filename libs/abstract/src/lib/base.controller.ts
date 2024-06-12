import { BaseService } from './base.service';
import { BaseEntity } from './base.entity';
import { EntityDTO, FromEntityType, RequiredEntityData } from '@mikro-orm/postgresql';
import {
    applyDecorators,
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { PaginationDto, UserRole } from '@henshi/types';
import { AuthGuard, RolesGuard } from '@henshi/guards';
import { Roles } from '@henshi/decorators';

type BaseControllerFactoryOptions = {
    authRequired: boolean;
    role: UserRole;
};

type BulkDeleteDto = {
    id: string[];
};

function Auth({ authRequired = false, role = UserRole.FREE_USER }: BaseControllerFactoryOptions) {
    if (!authRequired) return applyDecorators();

    return applyDecorators(UseGuards(AuthGuard, RolesGuard), Roles(role));
}

export function BaseControllerFactory<
    Entity extends BaseEntity,
    CreateDto extends RequiredEntityData<Entity>,
    UpdateDto extends Partial<EntityDTO<FromEntityType<Entity>>>,
>(options: BaseControllerFactoryOptions) {
    @Auth(options)
    class BaseController {
        constructor(public readonly service: BaseService<Entity, CreateDto, UpdateDto>) {}

        @Post()
        create(@Body() dto: CreateDto) {
            return this.service.create(dto);
        }

        @Get()
        @UsePipes(new ValidationPipe({ transform: true }))
        findAll(@Query() dto: PaginationDto) {
            return this.service.findAll(dto);
        }

        @Get(':id')
        findById(@Param('id') id: string) {
            return this.service.findOne({ id } as any);
        }

        @Patch(':id')
        update(@Param('id') id: string, @Body() dto: UpdateDto) {
            return this.service.update(id, dto);
        }

        @Delete('bulk')
        bulkDelete(@Query(new ValidationPipe({ transform: true })) { id }: BulkDeleteDto) {
            return this.service.deleteMany(id);
        }

        @Delete(':id')
        delete(@Param('id') id: string) {
            return this.service.delete(id);
        }
    }

    return BaseController;
}
