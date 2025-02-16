import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPokemonDetailByIdQuery } from './get-pokemon-detail-by-id.query';
import { GetPokemonDetailByIdApplication } from './get-pokemon-detail-by-id.application';
import { PokemonDetail } from 'src/contexts/pokemon/domain/pokemon-detail';

/**
 * Query handler for `GetPokemonDetailByIdQuery`.
 */
@QueryHandler(GetPokemonDetailByIdQuery)
export class GetPokemonDetailByIdQueryHandler implements IQueryHandler<GetPokemonDetailByIdQuery, PokemonDetail> {
    /**
     * @param _app - The application service that retrieves a Pokémon detail by its ID.
     */
    constructor(private readonly _app: GetPokemonDetailByIdApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The Pokémon detail.
     */
    execute(query: GetPokemonDetailByIdQuery): Promise<PokemonDetail> {
        return this._app.exec(query.id);
    }
}
