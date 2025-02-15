import axios from 'axios';
import { BackendPokemonConstants } from './backend-pokemon.constants.ts';
import { GetPokemonDetailsByIdResponse } from './responses/get-pokemon-details-by-id.response.ts';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository.ts';
import { PokemonDetails } from '../../domain/pokemon-details.ts';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants.ts';


export class BackendPokemonRepository implements PokemonRepository {
    async getDetails(
        id: number,
    ): Promise<PokemonDetails | undefined> {
        let mapped: PokemonDetails | undefined;
        try {
            const { pokemon, evolutionChain, movements } = await axios
                .get<GetPokemonDetailsByIdResponse>(
                    BackendPokemonConstants.GET_DETAILS_BY_ID,
                    {
                        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                        params: {
                            id,
                        },
                    },
                )
                .then((res) => res.data);
            mapped = {
                pokemon: {
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
                    speed: pokemon.speed
                },
                movements,
                evolutionChain: evolutionChain.map((pokemon) => ({
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
                    speed: pokemon.speed
                }))
            };
        } catch (e) {
            console.error(e);
        }
        return mapped;
    }
}
