import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPokemonByIdQuery } from './get-pokemon-by-id.query';
import { Pokemon } from '../../domain/pokemon';
import { GetPokemonByIdApplication } from './get-pokemon-by-id.application';

/**
 * Query handler for the `GetPokemonByIdQuery`.
 */
@QueryHandler(GetPokemonByIdQuery)
export class GetPokemonByIdQueryHandler implements IQueryHandler<GetPokemonByIdQuery, Pokemon> {
    /**
     * @param _app - The application to handle the query.
     */
    constructor(private readonly _app: GetPokemonByIdApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The pokémon with the specified ID.
     */
    execute(query: GetPokemonByIdQuery): Promise<Pokemon> {
        return this._app.exec(query.id);
    }
}
