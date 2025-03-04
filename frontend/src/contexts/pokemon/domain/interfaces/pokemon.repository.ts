import { PokemonDetail } from '../pokemon-detail.ts';

/**
 * Represents a Pokémon repository.
 */
export interface PokemonRepository {
    /**
     * Create a new Pokémon.
     * @param token - The token to authenticate the request.
     * @param name - The Pokémon name.
     * @param frontImageUrl - The Pokémon front image URL.
     * @param description - The Pokémon description.
     * @param height - The Pokémon height.
     * @param weight - The Pokémon weight.
     * @param attack - The Pokémon attack.
     * @param defense - The Pokémon defense.
     * @param hp - The Pokémon HP.
     * @param specialAttack - The Pokémon special attack.
     * @param specialDefense - The Pokémon special defense.
     * @param speed - The Pokémon speed.
     * @param movements - The Pokémon movements.
     * @param types - The Pokémon types.
     */
    create(
        token: string,
        name: string,
        frontImageUrl: string,
        description: string,
        height: number,
        weight: number,
        attack: number,
        defense: number,
        hp: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
        movements: string[],
        types: number[],
    ): Promise<void>;

    /**
     * Create a new Pokémon.
     * @param id - The Pokémon ID.
     * @param token - The token to authenticate the request.
     * @param name - The Pokémon name.
     * @param frontImageUrl - The Pokémon front image URL.
     * @param description - The Pokémon description.
     * @param height - The Pokémon height.
     * @param weight - The Pokémon weight.
     * @param attack - The Pokémon attack.
     * @param defense - The Pokémon defense.
     * @param hp - The Pokémon HP.
     * @param specialAttack - The Pokémon special attack.
     * @param specialDefense - The Pokémon special defense.
     * @param speed - The Pokémon speed.
     * @param movements - The Pokémon movements.
     * @param types - The Pokémon types.
     */
    update(
        id: number,
        token: string,
        name: string,
        frontImageUrl: string,
        description: string,
        height: number,
        weight: number,
        attack: number,
        defense: number,
        hp: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
        movements: string[],
        types: number[],
    ): Promise<void>;

    /**
     * Get a Pokémon detail by its id.
     * @param id - The Pokémon id.
     * @returns The Pokémon detail or undefined if not found.
     */
    getDetailById(id: number): Promise<PokemonDetail | undefined>;
}
