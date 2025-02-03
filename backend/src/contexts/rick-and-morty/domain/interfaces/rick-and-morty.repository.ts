import { RickAndMortyCharacter } from '../rick-and-morty-character';

/**
 * Rick and Morty repository interface.
 */
export interface RickAndMortyRepository {
    /**
     * Get a Rick and Morty character by its ID.
     * @param id - The ID of the character to search for.
     * @returns The character if found, otherwise undefined.
     */
    getCharacterById(id: number): Promise<RickAndMortyCharacter | undefined>;
}
