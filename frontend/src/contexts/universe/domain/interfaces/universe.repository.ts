import { UniverseEntity } from '../universe-entity.ts';
import { UniverseTypeNameConstants } from '../constants/universe-type-name.constants.ts';

/**
 * Interface for access universe external data.
 */
export interface UniverseRepository {
    /**
     * Get a universe entity by its ID.
     * @param id - The ID of the universe entity to retrieve.
     * @param type - The type of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    getUniverseEntityByIdAndType(id: string, type: UniverseTypeNameConstants): Promise<UniverseEntity | undefined>;
}
