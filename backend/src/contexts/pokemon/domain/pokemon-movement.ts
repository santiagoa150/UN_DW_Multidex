/**
 * Represents the movement of a pokémon.
 */
export class PokemonMovement {
    /**
     * The unique identifier of the movement.
     * @param _pokemonId - The unique identifier of the pokémon
     * @param _name - The name of the movement
     * @param _levelLearnedAt - The level at which the pokémon learns the movement
     */
    constructor(
        private readonly _pokemonId: number,
        private readonly _name: string,
        private readonly _levelLearnedAt: number,
    ) {}

    get pokemonId(): number {
        return this._pokemonId;
    }

    get name(): string {
        return this._name;
    }

    get levelLearnedAt(): number {
        return this._levelLearnedAt;
    }
}
