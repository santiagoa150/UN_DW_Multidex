import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository.ts';
import { StorageRepository } from '../../../shared/domain/interfaces/storage.repository.ts';
import { SharedStorageConstants } from '../../../shared/domain/constants/shared-storage.constants.ts';

/**
 * Application to edit a Rick and Morty character.
 */
export class EditRickAndMortyCharacterApplication {
    /**
     * @param _repository - The Rick and Morty repository.
     * @param _storage - The storage repository.
     */
    constructor(
        private readonly _repository: RickAndMortyRepository,
        private readonly _storage: StorageRepository,
    ) {}

    /**
     * Edit a new Rick and Morty character.
     * @param frontImageUrl - The front image URL of the character.
     * @param id - The ID of the character to edit.
     * @param name - The name of the character.
     * @param entityType - The type of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param origin - The origin of the character.
     * @param location - The location of the character.
     * @param description - The description of the character.
     */
    async exec(
        frontImageUrl: string,
        id: number,
        name: string,
        entityType: string,
        status: string,
        gender: string,
        origin: string,
        location: string,
        description: string,
    ): Promise<void> {
        const token = (await this._storage.get(SharedStorageConstants.AUTH_TOKEN)) as string;
        return this._repository.edit(
            token,
            id,
            frontImageUrl,
            name,
            entityType,
            status,
            gender,
            origin,
            location,
            description,
        );
    }
}
