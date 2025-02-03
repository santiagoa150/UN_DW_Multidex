import { DefaultResponse } from '../../../shared/api/responses/default.response';
import { ApiProperty } from '@nestjs/swagger';
import { HttpUniverseEntity } from '../models/http-universe-entity';

/**
 * The response for the get universe entity by type and ID request.
 */
export class GetUniverseEntityByIdAndTypeResponse extends DefaultResponse {
    @ApiProperty({ description: 'The universe entity.', type: HttpUniverseEntity })
    entity: HttpUniverseEntity;
}
