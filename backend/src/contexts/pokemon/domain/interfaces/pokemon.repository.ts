import { Pokemon } from '../pokemon';
import { PokemonType } from '../pokemon-type';
import { PokemonMovement } from '../pokemon-movement';

/**
 * Interface for Pokémon repository.
 */
export interface PokemonRepository {
    /**
     * Create a new Pokémon.
     * @param id The id of the Pokémon.
     * @param name The name of the Pokémon.
     * @param pokemonTypes The types of the Pokémon.
     * @param frontImageUrl The front image URL of the Pokémon.
     * @param description The description of the Pokémon.
     * @param weight The weight of the Pokémon.
     * @param height The height of the Pokémon.
     * @param hp The HP of the Pokémon.
     * @param attack The attack of the Pokémon.
     * @param defense The defense of the Pokémon.
     * @param specialAttack The special attack of the Pokémon.
     * @param specialDefense The special defense of the Pokémon.
     * @param speed The speed of the Pokémon.
     * @param movements The movements of the Pokémon.
     * @returns The created Pokémon.
     */
    create(
        id: number,
        name: string,
        pokemonTypes: number[],
        frontImageUrl: string,
        description: string,
        weight: number,
        height: number,
        hp: number,
        attack: number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
        movements: PokemonMovement[],
    ): Promise<void>;

    /**
     * Get all Pokémon types.
     * @returns All Pokémon types.
     */
    getAllPokemonTypes(): Promise<PokemonType[]>;

    /**
     * Get a Pokémon by its id.
     * @param id The id of the Pokémon to search for.
     * @returns The Pokémon if found, otherwise undefined.
     */
    getById(id: number): Promise<Pokemon | undefined>;
}
