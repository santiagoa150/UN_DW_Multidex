import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants.ts';
import { BackendUniverseRepository } from '../../../infrastructure/backend/backend-universe.repository.ts';

/**
 * Get Universe Entity By ID Application.
 */
export class GetUniverseEntityByTypeApplication {
    /**
     * @param repository - The universe repository.
     */
    constructor(private readonly repository: BackendUniverseRepository) {}

    /**
     * Get a universe entity by its ID.
     * @param type - The type of the universe entity to retrieve.
     * @param page - The page of the universe entity to retrieve.
     * @param limit - The limit of the universe entity to retrieve.
     * @param nameFilter - The name filter of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    async exec(
        type: UniverseTypeNameConstants,
        page: number,
        limit: number,
        nameFilter: string | undefined,
    ): Promise<UniverseEntity[] | undefined> {
        return this.repository.getUniverseEntityByType(type, page, limit, nameFilter);
    }
}
