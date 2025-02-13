/**
 * Represents a Pokémon type.
 */
export class PokemonType {
    /**
     * @param _id - The unique identifier of the type
     * @param _name - The name of the type
     */
    constructor(
        private readonly _id: number,
        private readonly _name: string,
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}
