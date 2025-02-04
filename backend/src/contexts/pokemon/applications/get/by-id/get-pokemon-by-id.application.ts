import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../../domain/interfaces/pokemon.repository';
import { Pokemon } from '../../../domain/pokemon';
import { PokemonNotFoundException } from '../../../domain/exceptions/pokemon-not-found.exception';

/**
 * Application service to get a Pokémon by its id.
 */
export class GetPokemonByIdApplication {
    private readonly _logger: Logger = new Logger(GetPokemonByIdApplication.name);

    /**
     * @param _repository - The Pokémon repository.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Gets a Pokémon by its id.
     * @param id - The Pokémon id.
     * @returns The Pokémon with the given id.
     * @throws {PokemonNotFoundException} Thrown when the Pokémon is not found.
     */
    async exec(id: number): Promise<Pokemon> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const pokemon: Pokemon | undefined = await this._repository.getById(id);
        if (!pokemon) throw new PokemonNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH :: id: ${id}`);
        return pokemon;
    }
}
