import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpUniverseConstants } from './http-universe.constants';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DefaultUniverseEntityRequest } from './requests/default-universe-entity.request';
import { GetUniverseEntityByIdAndTypeResponse } from './responses/get-universe-entity-by-id-and-type.response';
import { GetUniverseEntityByIdAndTypeQuery } from '../applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.query';
import { UniverseEntity } from '../domain/universe-entity';
import { UniverseTypeNameConstants } from '../domain/constants/universe-type-name.constants';
import { UniverseEntityMappers } from '../infrastructure/mappers/universe-entity.mappers';
import { DefaultResponse } from '../../shared/api/responses/default.response';
import { JwtAuthGuard } from '../../user/infrastructure/nestjs/guards/jwt/jwt-auth.guard';
import { DeleteUniverseEntityByIdAndUserCommand } from '../applications/delete/by-id-and-user/delete-universe-entity-by-id-and-user.command';
import { GetUserAuthData } from '../../user/infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../../user/domain/user-auth-data';
import { GetUniverseEntitiesByTypeResponse } from './responses/get-universe-entities-by-type.response';
import { GetUniverseEntitiesByTypeRequest } from './requests/get-universe-entities-by-type.request';
import { Pagination } from '../../shared/domain/pagination';
import { GetUniverseEntitiesByTypeQuery } from '../applications/get/universe-entity/by-type/get-universe-entities-by-type.query';

/**
 * Controller for the universe API.
 */
@Controller(HttpUniverseConstants.PREFIX)
@ApiTags(HttpUniverseConstants.API_TAG)
export class HttpUniverseController {
    /**
     * @param _queryBus - The query bus used to dispatch queries.
     * @param _commandBus - The command bus used to dispatch commands.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus,
    ) {}

    /**
     * Retrieves a universe entity by its type and id.
     * @param query - The query parameters.
     * @returns The universe entity.
     */
    @Get(HttpUniverseConstants.GET_UNIVERSE_ENTITY_BY_ID_AND_TYPE_URI)
    @ApiAcceptedResponse({ type: GetUniverseEntityByIdAndTypeResponse })
    async getUniverseEntityByIdAndType(
        @Query() query: DefaultUniverseEntityRequest,
    ): Promise<GetUniverseEntityByIdAndTypeResponse> {
        const response = new GetUniverseEntityByIdAndTypeResponse();
        const entity = await this._queryBus.execute<GetUniverseEntityByIdAndTypeQuery, UniverseEntity>(
            new GetUniverseEntityByIdAndTypeQuery(query.id, query.universeType as UniverseTypeNameConstants),
        );
        response.entity = UniverseEntityMappers.universeEntity2DTO(entity);
        return response;
    }

    /**
     * Retrieves a list of universe entities by their type.
     * @param query - The query parameters.
     * @returns The universe entities.
     */
    @Get(HttpUniverseConstants.GET_UNIVERSE_ENTITIES_BY_TYPE_URI)
    @ApiAcceptedResponse({ type: GetUniverseEntitiesByTypeResponse })
    async getUniverseEntitiesByType(
        @Query() query: GetUniverseEntitiesByTypeRequest,
    ): Promise<GetUniverseEntitiesByTypeResponse> {
        const response = new GetUniverseEntitiesByTypeResponse();
        const entities: Pagination<UniverseEntity> = await this._queryBus.execute<
            GetUniverseEntitiesByTypeRequest,
            Pagination<UniverseEntity>
        >(
            new GetUniverseEntitiesByTypeQuery(
                query.universeType as UniverseTypeNameConstants,
                query.page,
                query.limit,
                query.nameFilter,
            ),
        );
        response.metadata = entities.metadata;
        response.entities = UniverseEntityMappers.universeEntities2DTO(entities.data);
        return response;
    }

    /**
     * Deletes a universe entity by its id.
     * @param query - The query parameters.
     * @param authData
     * @returns The default response.
     */
    @Delete(HttpUniverseConstants.DELETE_UNIVERSE_ENTITY_BY_ID_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deleteUniverseEntityByIdAndUser(
        @Query() query: DefaultUniverseEntityRequest,
        @GetUserAuthData() authData: UserAuthData,
    ): Promise<DefaultResponse> {
        await this._commandBus.execute<DeleteUniverseEntityByIdAndUserCommand>(
            new DeleteUniverseEntityByIdAndUserCommand(
                query.id,
                authData.userId,
                query.universeType as UniverseTypeNameConstants,
            ),
        );
        return new DefaultResponse();
    }
}
