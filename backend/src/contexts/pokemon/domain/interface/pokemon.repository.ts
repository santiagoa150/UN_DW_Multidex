import { Pokemon } from '../pokemon';

/**
 * Interface for Pokémon repository.
 */
export interface PokemonRepository {
    /**
     * Get a Pokémon by its id.
     * @param id The id of the Pokémon to search for.
     * @returns The Pokémon if found, otherwise undefined.
     */
    getById(id: string): Promise<Pokemon | undefined>;
}
