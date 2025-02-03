import { UniverseRepository } from '../../../domain/interfaces/universe.repository.ts';
import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants.ts';

/**
 * Get Universe Entity By ID Application.
 */
export class GetUniverseEntityByIdAndTypeApplication {
    /**
     * @param repository - The universe repository.
     */
    constructor(private readonly repository: UniverseRepository) {}

    /**
     * Get a universe entity by its ID.
     * @param id - The ID of the universe entity to retrieve.
     * @param type - The type of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    async exec(id: string, type: UniverseTypeNameConstants): Promise<UniverseEntity | undefined> {
        return this.repository.getUniverseEntityByIdAndType(id, type);
    }
}
