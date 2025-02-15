import { RickAndMortyCharacter } from '../rick-and-morty-character';

/**
 * Rick and Morty repository interface.
 */
export interface RickAndMortyRepository {
    /**
     * Create a Rick and Morty character.
     * @param id - The ID of the character.
     * @param name - The name of the character.
     * @param type - The type of the character.
     * @param frontImageUrl - The URL of the character's front image.
     * @param description - The description of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param location - The location of the character.
     * @param origin - The origin of the character.
     */
    createCharacter(
        id: number,
        name: string,
        type: string,
        frontImageUrl: string,
        description: string,
        status: string,
        gender: string,
        location: string,
        origin: string,
    ): Promise<void>;

    /**
     * Get a Rick and Morty character by its ID.
     * @param id - The ID of the character to search for.
     * @returns The character if found, otherwise undefined.
     */
    getCharacterById(id: number): Promise<RickAndMortyCharacter | undefined>;
}
