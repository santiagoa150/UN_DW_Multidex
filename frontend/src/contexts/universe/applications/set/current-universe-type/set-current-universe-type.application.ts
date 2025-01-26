import { StorageRepository } from '../../../../shared/domain/interfaces/storage.repository.ts';
import { UniverseStorageConstants } from '../../../domain/constants/universe-storage.constants.ts';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants.ts';

/**
 * Set Current Universe Type Application.
 */
export class SetCurrentUniverseTypeApplication {
    /**
     * @param repository - The storage repository.
     */
    constructor(private readonly repository: StorageRepository) {}

    /**
     * Set the current universe type.
     * @param universeType - The universe type to set as the current universe.
     */
    exec(universeType: UniverseTypeNameConstants): Promise<void> {
        return this.repository.set(UniverseStorageConstants.CURRENT_UNIVERSE, universeType);
    }
}
