/**
 * Rick and Morty repository interface.
 */
export interface RickAndMortyRepository {
    /**
     * Create a new Rick and Morty character.
     * @param token - The token to authenticate the request.
     * @param frontImageUrl - The front image URL of the character.
     * @param name - The name of the character.
     * @param entityType - The type of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param origin - The origin of the character.
     * @param location - The location of the character.
     * @param description - The description of the character.
     */
    create(
        token: string,
        frontImageUrl: string,
        name: string,
        entityType: string,
        status: string,
        gender: string,
        origin: string,
        location: string,
        description: string,
    ): Promise<void>;

    /**
     * Edit a new Rick and Morty character.
     * @param token - The token to authenticate the request.
     * @param id - The ID of the character to edit.
     * @param frontImageUrl - The front image URL of the character.
     * @param name - The name of the character.
     * @param entityType - The type of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param origin - The origin of the character.
     * @param location - The location of the character.
     * @param description - The description of the character.
     */
    edit(
        token: string,
        id: number,
        frontImageUrl: string,
        name: string,
        entityType: string,
        status: string,
        gender: string,
        origin: string,
        location: string,
        description: string,
    ): Promise<void>;
}
