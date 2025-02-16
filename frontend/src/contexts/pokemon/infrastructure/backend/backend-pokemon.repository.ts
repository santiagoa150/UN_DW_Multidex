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
        });

        try {
            const { pokemon, evolutionChain, movements } = await axios
                .get<GetPokemonDetailByIdResponse>(BackendPokemonConstants.GET_POKEMON_DETAIL_BY_ID, {
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
