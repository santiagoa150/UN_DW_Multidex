import { IQuery } from '@nestjs/cqrs';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants';

/**
 * Represents a query to retrieve a universe entity by its type and id.
 */
export class GetUniverseEntityByIdAndTypeQuery implements IQuery {
    /**
     * @param id - The entity id.
     * @param type - The entity type.
     */
    constructor(
        public readonly id: string,
        public readonly type: UniverseTypeNameConstants,
    ) {
    }
}