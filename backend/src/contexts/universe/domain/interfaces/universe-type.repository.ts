import { UniverseType } from '../universe-type';

/**
 * Interface for access universe type external data.
 */
export interface UniverseTypeRepository {

    /**
     * Get all universe types.
     * @returns All universe types.
     */
    getAll(): Promise<UniverseType[]>;
}