import { IQuery } from '@nestjs/cqrs';

/**
 * Query to get a Pokémon detail by its id.
 */
export class GetPokemonDetailByIdQuery implements IQuery {
    /**
     * @param id - The Pokémon id.
     */
    constructor(public readonly id: number) {}
}
