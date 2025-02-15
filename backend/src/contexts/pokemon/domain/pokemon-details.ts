import { Pokemon } from "./pokemon";
import { PokemonMovement } from "./pokemon-movement";

export class PokemonDetails{
    constructor(
        private readonly _pokemon: Pokemon,
        private readonly _movements: PokemonMovement[],
        private readonly _evolutionChain: Pokemon[]
    ) {}

    get pokemon(): Pokemon{
        return this._pokemon;
    }

    get movements(): PokemonMovement[]{
        return this._movements;
    }

    get evolutionChain(): Pokemon[]{
        return this._evolutionChain;
    }

}