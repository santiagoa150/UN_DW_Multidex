import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { Logger } from '@nestjs/common';
import { DeleteUniverseEntityByIdAndUserApplication } from '../../../universe/applications/delete/by-id-and-user/delete-universe-entity-by-id-and-user.application';
import { RickAndMortyCharacterNotFoundException } from '../../domain/exceptions/rick-and-morty-character-not-found.exception';

/**
 * Application for deleting a Rick and Morty character.
 */
export class DeleteRickAndMortyCharacterByIdAndUserApplication {
    private readonly _logger: Logger = new Logger(DeleteUniverseEntityByIdAndUserApplication.name);

    /**
     * @param _repository - The Rick and Morty repository.
     */
    constructor(private readonly _repository: RickAndMortyRepository) {}

    /**
     * Deletes a Rick and Morty character by its id and user id.
     * @param id - The Rick and Morty character id.
     * @param userId - The owner of the Rick and Morty character.
     */
    async exec(id: number, userId: string): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const wasDeleted = await this._repository.delete(id, userId);
        if (!wasDeleted) throw new RickAndMortyCharacterNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH`);
    }
}
