import { RickAndMortyCharacter } from '../rick-and-morty-character';
import { Pagination } from '../../../shared/domain/pagination';

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
     * Delete a Rick and Morty character by its ID.
     * @param id - The ID of the character to delete.
     * @param userId - The owner of the character.
     */
    delete(id: number, userId: string): Promise<boolean>;

    /**
     * Get all Rick and Morty characters.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of Rick and Morty characters.
     */
    getAllCharacters(page: number, limit: number, nameFilter?: string): Promise<Pagination<RickAndMortyCharacter>>;

    /**
     * Get a Rick and Morty character by its ID.
     * @param id - The ID of the character to search for.
     * @returns The character if found, otherwise undefined.
     */
    getCharacterById(id: number): Promise<RickAndMortyCharacter | undefined>;
}
