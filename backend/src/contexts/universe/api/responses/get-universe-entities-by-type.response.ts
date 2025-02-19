import { DefaultResponse } from '../../../shared/api/responses/default.response';
import { PaginationMetadata } from '../../../shared/domain/pagination-metadata';
import { ApiProperty } from '@nestjs/swagger';
import { HttpUniverseEntityModel } from '../models/http-universe-entity.model';

/**
 * Represents the metadata of a paginated list.
 */
class GetUniverseEntitiesByTypeMetadata implements PaginationMetadata {
    @ApiProperty({ description: 'The page number.' })
    page: number;

    @ApiProperty({ description: 'The total of elements.' })
    total: number;

    @ApiProperty({ description: 'The total of pages.' })
    totalPages: number;
}

/**
 * The response for the get universe entities by type request.
 */
export class GetUniverseEntitiesByTypeResponse extends DefaultResponse {
    @ApiProperty({ description: 'The metadata.', type: GetUniverseEntitiesByTypeMetadata })
    metadata: GetUniverseEntitiesByTypeMetadata;

    @ApiProperty({ description: 'The universe entities.', type: [HttpUniverseEntityModel] })
    entities: HttpUniverseEntityModel[];
}
