import axios from 'axios';
import { UniverseRepository } from '../../domain/interfaces/universe.repository.ts';
import { UniverseEntity } from '../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants.ts';
import { BackendUniverseConstants } from './backend-universe.constants.ts';
import {
    GetUniverseEntityByIdAndTypeResponse,
    GetUniverseEntityByIdResponse,
} from './responses/get-universe-entity-by-id-and-type.response.ts';

/**
 * Backend implementation of the universe repository.
 * This implementation retrieves the universe entity from the backend.
 */
export class BackendUniverseRepository implements UniverseRepository {
    /**
     * Create a new universe entity.
     * @param token - The token of the user creating the universe entity.
     * @param id - The ID of the universe entity to create.
     * @param type - The type of the universe entity to create.
     */
    async deleteUniverseEntity(token: string, id: number, type: UniverseTypeNameConstants): Promise<void> {
        try {
            await axios.delete(BackendUniverseConstants.DELETE_UNIVERSE_ENTITY_URI, {
                baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                params: {
                    id,
                    universeType: type,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

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
                creatorId: entity.creatorId,
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

    /**
     * Retrieves a universe entity by its type from the backend.
     * @param type - The type of the universe entity to retrieve.
     * @param page - The page of the universe entity to retrieve.
     * @param limit - The limit of the universe entity to retrieve.
     * @param nameFilter - The name filter of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    async getUniverseEntityByType(
        type: UniverseTypeNameConstants,
        page: number,
        limit: number,
        nameFilter: string | undefined,
    ): Promise<UniverseEntity[] | undefined> {
        let mapped: UniverseEntity[] | undefined;
        try {
            const { entities } = await axios
                .get<GetUniverseEntityByIdResponse>(BackendUniverseConstants.GET_UNIVERSE_ENTITY_BY_ID_URI, {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    params: {
                        page,
                        limit,
                        universeType: type,
                        nameFilter,
                    },
                })
                .then((res) => res.data);
            mapped = entities.map((entity) => {
                return {
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
            });
        } catch (e) {
            console.error(e);
        }
        return mapped;
    }
}
