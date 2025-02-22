import axios from 'axios';
import { UniverseRepository } from '../../domain/interfaces/universe.repository.ts';
import { UniverseEntity } from '../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants.ts';
import { BackendUniverseConstants } from './backend-universe.constants.ts';
import { GetUniverseEntityByIdAndTypeResponse } from './responses/get-universe-entity-by-id-and-type.response.ts';

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
        id: number,
        type: UniverseTypeNameConstants,
    ): Promise<UniverseEntity | undefined> {
        let mapped: UniverseEntity | undefined;
        try {
            const { entity } = await axios
                .get<GetUniverseEntityByIdAndTypeResponse>(
                    BackendUniverseConstants.GET_UNIVERSE_ENTITY_BY_ID_AND_TYPE_URI,
                    {
                        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                        params: {
                            id,
                            universeType: type,
                        },
                    },
                )
                .then((res) => res.data);
            mapped = {
                creator: entity.creatorName,
                description: entity.description,
                entityTypes: entity.entityTypes,
                frontImageUrl: entity.frontImageUrl,
                gender: entity.gender,
                height: entity.height,
                id: entity.id,
                location: entity.location,
                name: entity.name,
                origin: entity.origin,
                status: entity.status,
                universeType: entity.universeType as UniverseTypeNameConstants,
                weight: entity.weight,
            };
        } catch (e) {
            console.error(e);
        }
        return mapped;
    }
}
