import axios from 'axios';
import { BackendPokemonConstants } from './backend-pokemon.constants.ts';
import {
    GetPokemonDetailByIdPokemonData,
    GetPokemonDetailByIdResponse,
} from './responses/get-pokemon-detail-by-id.response.ts';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository.ts';
import { PokemonDetail } from '../../domain/pokemon-detail.ts';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants.ts';
import { Pokemon } from '../../domain/pokemon.ts';

/**
 * Backend implementation of the Pokémon repository.
 */
export class BackendPokemonRepository implements PokemonRepository {
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
    async create(
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
    ): Promise<void> {
        try {
            await axios.post(
                BackendPokemonConstants.GENERAL_POKEMON_URI,
                {
                    name,
                    frontImageUrl,
                    description,
                    height,
                    weight,
                    attack,
                    defense,
                    hp,
                    specialAttack,
                    specialDefense,
                    speed,
                    movements,
                    types,
                },
                {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
        }
    }

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
    async update(
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
    ): Promise<void> {
        try {
            await axios.patch(
                BackendPokemonConstants.GENERAL_POKEMON_URI,
                {
                    name,
                    frontImageUrl,
                    description,
                    height,
                    weight,
                    attack,
                    defense,
                    hp,
                    specialAttack,
                    specialDefense,
                    speed,
                    movements,
                    types,
                    id,
                },
                {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Retrieves a Pokémon detail by its ID.
     * @param id - The ID of the Pokémon to retrieve.
     * @returns The Pokémon detail.
     */
    async getDetailById(id: number): Promise<PokemonDetail | undefined> {
        let mapped: PokemonDetail | undefined;
        const mapPokemon = (pokemon: GetPokemonDetailByIdPokemonData): Pokemon => ({
            description: pokemon.description,
            entityTypes: pokemon.entityTypes,
            frontImageUrl: pokemon.frontImageUrl,
            height: pokemon.height,
            id: pokemon.id,
            name: pokemon.name,
            universeType: pokemon.universeType as UniverseTypeNameConstants,
            weight: pokemon.weight,
            attack: pokemon.attack,
            defense: pokemon.defense,
            hp: pokemon.hp,
            specialAttack: pokemon.specialAttack,
            specialDefense: pokemon.specialDefense,
            speed: pokemon.speed,
            creatorName: pokemon.creatorName,
            creatorId: pokemon.creatorId,
        });

        try {
            const { pokemon, evolutionChain, movements } = await axios
                .get<GetPokemonDetailByIdResponse>(BackendPokemonConstants.GENERAL_POKEMON_URI, {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    params: {
                        id,
                    },
                })
                .then((res) => res.data);
            mapped = {
                pokemon: mapPokemon(pokemon),
                movements,
                evolutionChain: evolutionChain.map((pokemon) => mapPokemon(pokemon)),
            };
        } catch (e) {
            console.error(e);
        }
        return mapped;
    }
}
