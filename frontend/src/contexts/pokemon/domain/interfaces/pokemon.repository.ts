import { PokemonDetail } from '../pokemon-detail.ts';

/**
 * Represents a Pokémon repository.
 */
export interface PokemonRepository {
    /**
     * Get a Pokémon detail by its id.
     * @param id - The Pokémon id.
     * @returns The Pokémon detail or undefined if not found.
     */
    getDetailById(id: number): Promise<PokemonDetail | undefined>;
}
