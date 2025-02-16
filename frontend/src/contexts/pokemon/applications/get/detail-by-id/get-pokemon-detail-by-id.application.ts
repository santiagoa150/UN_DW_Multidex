import { PokemonRepository } from '../../../domain/interfaces/pokemon.repository.ts';
import { PokemonDetail } from '../../../domain/pokemon-detail.ts';

/**
 * Application service that retrieves a Pokémon detail by its ID.
 */
export class GetPokemonDetailByIdApplication {
    /**
     * @param _repository - The Pokémon repository.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Retrieves a Pokémon detail by its ID.
     * @param id - The ID of the Pokémon to retrieve.
     * @returns The Pokémon detail.
     */
    async exec(id: number): Promise<PokemonDetail | undefined> {
        return this._repository.getDetailById(id);
    }
}
