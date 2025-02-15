import { Pokemon } from "./pokemon";
import { PokemonMovement } from "./pokemon-movement";

/**
 * The definition of a universe entity.
 */
export type PokemonDetails = {
    pokemon: Pokemon,
    evolutionChain: Pokemon[],
    movements: PokemonMovement[]
};
