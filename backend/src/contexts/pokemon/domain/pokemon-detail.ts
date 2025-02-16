import { Pokemon } from './pokemon';
import { PokemonMovement } from './pokemon-movement';

/**
 * Represents a Pokémon detail.
 */
export class PokemonDetail {
    /**
     * @param _pokemon - The Pokémon.
     * @param _movements - The Pokémon movements.
     * @param _evolutionChain - The Pokémon evolution chain.
     */
    constructor(
        private readonly _pokemon: Pokemon,
        private readonly _movements: PokemonMovement[],
        private readonly _evolutionChain: Pokemon[],
    ) {}

    get pokemon(): Pokemon {
        return this._pokemon;
    }

    get movements(): PokemonMovement[] {
        return this._movements;
    }

    get evolutionChain(): Pokemon[] {
        return this._evolutionChain;
    }
}
