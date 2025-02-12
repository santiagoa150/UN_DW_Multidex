import { Controller, Get, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { HttpUniverseConstants } from './http-universe.constants';
import { QueryBus } from '@nestjs/cqrs';
import { GetUniverseEntityByIdAndTypeRequest } from './requests/get-universe-entity-by-id-and-type.request';
import { GetUniverseEntityByIdAndTypeResponse } from './responses/get-universe-entity-by-id-and-type.response';
import { GetUniverseEntityByIdAndTypeQuery } from '../applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.query';
import { UniverseEntity } from '../domain/universe-entity';
import { UniverseTypeNameConstants } from '../domain/constants/universe-type-name.constants';
import { UniverseEntityMappers } from '../infrastructure/universe-entity.mappers';
import { UniverseEntityDto } from '../infrastructure/universe-entity.dto';

/**
 */
@Controller(HttpUniverseConstants.PREFIX)
@ApiTags(HttpUniverseConstants.API_TAG)
export class HttpUniverseController {
    /**
     * @param _queryBus - The query bus used to dispatch queries.
     */
    constructor(private readonly _queryBus: QueryBus) {}

    /**
     * Retrieves a universe entity by its type and id.
     * @param query - The query parameters.
     * @returns The universe entity.
     */
    @Get(HttpUniverseConstants.GET_UNIVERSE_ENTITY_BY_ID_AND_TYPE_URI)
    @ApiAcceptedResponse({ type: GetUniverseEntityByIdAndTypeResponse })
    async getUniverseEntityByIdAndType(
        @Query() query: GetUniverseEntityByIdAndTypeRequest,
    ): Promise<GetUniverseEntityByIdAndTypeResponse> {
        const response = new GetUniverseEntityByIdAndTypeResponse();
        const entity = await this._queryBus.execute<GetUniverseEntityByIdAndTypeQuery, UniverseEntity>(
            new GetUniverseEntityByIdAndTypeQuery(query.id, query.universeType as UniverseTypeNameConstants),
        );
        const dto: UniverseEntityDto = UniverseEntityMappers.UniverseEntity2DTO(entity);
        response.entity = {
            description: dto.description,
            entityTypes: dto.entityTypes,
            frontImageUrl: dto.frontImageUrl,
            gender: dto.gender,
            height: dto.height,
            id: dto.id,
            location: dto.location,
            name: dto.name,
            origin: dto.origin,
            status: dto.status,
            universeType: dto.universeType,
            weight: dto.weight,
        };
        return response;
    }
}
