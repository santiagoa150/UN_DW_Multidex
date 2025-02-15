/**
 * Pokémon evolution chain domain entity.
 */
export class PokemonEvolutionChain {
    /**
     * @param _chainId - The evolution chain identifier.
     * @param _pokemonId - The Pokémon identifier.
     * @param _evolvesFrom - The Pokémon identifier to which the Pokémon evolves.
     */
    constructor(
        private readonly _chainId: string,
        private readonly _pokemonId: number,
        private readonly _evolvesFrom?: number,
    ) {}

    get chainId(): string {
        return this._chainId;
    }

    get pokemonId(): number {
        return this._pokemonId;
    }

    get evolvesTo(): number | undefined {
        return this._evolvesFrom;
    }
}
