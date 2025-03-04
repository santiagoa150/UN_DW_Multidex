import { UniverseType } from '../universe-type';

/**
 * Interface for access universe type external data.
 */
export interface UniverseTypeRepository {
    /**
     * Create universe types.
     * @returns The created universe types.
     */
    createUniverseTypes(): Promise<UniverseType[]>;

    /**
     * Get all universe types.
     * @returns All universe types.
     */
    getAll(): Promise<UniverseType[]>;

    /**
     * Update a universe type.
     * @param universeType
     */
    update(universeType: UniverseType): Promise<void>;
}
