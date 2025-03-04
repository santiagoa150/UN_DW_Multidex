import { UniverseRepository } from '../../domain/interfaces/universe.repository.ts';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants.ts';
import { StorageRepository } from '../../../shared/domain/interfaces/storage.repository.ts';
import { SharedStorageConstants } from '../../../shared/domain/constants/shared-storage.constants.ts';

/**
 * Application to delete a universe entity.
 */
export class DeleteUniverseEntityApplication {
    /**
     * @param _repository - The universe repository.
     * @param _storage - The storage repository.
     */
    constructor(
        private readonly _repository: UniverseRepository,
        private readonly _storage: StorageRepository,
    ) {}

    /**
     * Deletes a universe entity.
     * @param id - The ID of the universe entity to delete.
     * @param type - The type of the universe entity to delete.
     */
    async exec(id: number, type: UniverseTypeNameConstants): Promise<void> {
        const token: string = (await this._storage.get(SharedStorageConstants.AUTH_TOKEN)) as string;
        await this._repository.deleteUniverseEntity(token, id, type);
    }
}
