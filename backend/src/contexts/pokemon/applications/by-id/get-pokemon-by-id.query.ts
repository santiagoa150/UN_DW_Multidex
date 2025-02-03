import { IQuery } from '@nestjs/cqrs';

/**
 * Query to get a Pokémon by its id.
 */
export class GetPokemonByIdQuery implements IQuery {
    /**
     * @param id - The Pokémon id.
     */
    constructor(public readonly id: string) {}
}
