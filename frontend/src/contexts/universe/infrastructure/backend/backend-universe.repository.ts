import { UniverseRepository } from '../../domain/interfaces/universe.repository.ts';
import { UniverseEntity } from '../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants.ts';

/**
 * Backend implementation of the universe repository.
 * This implementation retrieves the universe entity from the backend.
 */
export class BackendUniverseRepository implements UniverseRepository {
    /**
     * Retrieves a universe entity by its ID from the backend.
     * @param id - The ID of the universe entity to retrieve.
     * @param type - The type of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    async getUniverseEntityByIdAndType(
        id: string,
        type: UniverseTypeNameConstants,
    ): Promise<UniverseEntity | undefined> {
        const entities: UniverseEntity[] = [
            {
                id: '1',
                allowDetail: true,
                name: 'Blastoise',
                type: UniverseTypeNameConstants.POKEMON,
            },
            {
                id: '2',
                allowDetail: false,
                name: 'Rick',
                type: UniverseTypeNameConstants.RICK_AND_MORTY,
            },
        ];
        return entities.find((entity) => entity.id === id && type === entity.type);
    }
}
