import { Pokemon } from './pokemon';
import { PokemonMovement } from './pokemon-movement';

/**
 * The definition of a pokémon detail.
 */
export type PokemonDetail = {
    pokemon: Pokemon;
    evolutionChain: Pokemon[];
    movements: PokemonMovement[];
};
