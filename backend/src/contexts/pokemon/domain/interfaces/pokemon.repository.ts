import { Pokemon } from '../pokemon';
import { PokemonType } from '../pokemon-type';
import { PokemonMovement } from '../pokemon-movement';
import { PokemonEvolutionChain } from '../pokemon-evolution-chain';
import { PokemonDetail } from '../pokemon-detail';
import { Pagination } from '../../../shared/domain/pagination';

/**
 * Interface for Pokémon repository.
 */
export interface PokemonRepository {
    /**
     * Create a new Pokémon.
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
     * @param [id] The id of the Pokémon.
     * @param [creatorId] The creator of the Pokémon.
     * @returns The created Pokémon.
     */
    create(
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
        id?: number,
        creatorId?: string,
    ): Promise<Pokemon>;

    /**
     * Create a new Pokémon movement.
     * @param chain - The Pokémon movements to create.
     */
    createEvolutionChain(chain: PokemonEvolutionChain[]): Promise<void>;

    /**
     * Delete a Pokémon by its id.
     * @param id - The id of the Pokémon to delete.
     * @param userId - The owner of the Pokémon.
     * @returns True if the Pokémon was deleted, otherwise false.
     */
    delete(id: number, userId: string): Promise<boolean>;

    /**
     * Get all Pokémon.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of Pokémon.
     */
    getAll(page: number, limit: number, nameFilter?: string): Promise<Pagination<Pokemon>>;

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

    /**
     * Get a Pokémon by its id.
     * @param id - The id of the Pokémon to search for.
     * @returns The Pokémon if found, otherwise undefined.
     */
    getDetailById(id: number): Promise<PokemonDetail | undefined>;

    /**
     * Get a Pokémon evolution chain by its Pokémon id.
     * @param id - The id of the Pokémon to search for.
     * @returns The Pokémon evolution chain if found, otherwise undefined.
     */
    getEvolutionChainByPokemon(id: number): Promise<PokemonEvolutionChain>;

    /**
     * Update a Pokémon.
     * @param id - The id of the Pokémon.
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
     * @param evolutionChain The evolution chain of the Pokémon.
     */
    update(
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
        evolutionChain: PokemonEvolutionChain,
    ): Promise<void>;

    /**
     * Update the pokémon autoincrement.
     * @param lastId - The last Pokémon id.
     */
    updatePokemonAutoincrement(lastId: number): Promise<void>;
}
