import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { Logger } from '@nestjs/common';
import { PokemonNotFoundException } from '../../domain/exceptions/pokemon-not-found.exception';

/**
 * Application for deleting a pokémon.
 */
export class DeletePokemonByIdAndUserApplication {
    private readonly _logger: Logger = new Logger(DeletePokemonByIdAndUserApplication.name);

    /**
     * @param _repository - The pokémon repository.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Deletes a pokémon by its id.
     * @param id - The pokémon id.
     * @param userId - The owner of the pokémon.
     */
    async exec(id: number, userId: string): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const wasDeleted = await this._repository.delete(id, userId);
        if (!wasDeleted) throw new PokemonNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH`);
    }
}
