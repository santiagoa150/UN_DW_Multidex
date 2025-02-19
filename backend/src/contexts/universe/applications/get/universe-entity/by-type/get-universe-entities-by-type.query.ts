import { IQuery } from '@nestjs/cqrs';
import { UniverseTypeNameConstants } from '../../../../domain/constants/universe-type-name.constants';

/**
 * Query for getting universe entities by type.
 */
export class GetUniverseEntitiesByTypeQuery implements IQuery {
    /**
     * @param universeType - The universe type.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     */
    constructor(
        public readonly universeType: UniverseTypeNameConstants,
        public readonly page: number,
        public readonly limit: number,
        public readonly nameFilter?: string,
    ) {}
}
