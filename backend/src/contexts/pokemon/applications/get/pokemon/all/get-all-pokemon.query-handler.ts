import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPokemonQuery } from './get-all-pokemon.query';
import { Pokemon } from '../../../../domain/pokemon';
import { GetAllPokemonApplication } from './get-all-pokemon.application';
import { Pagination } from '../../../../../shared/domain/pagination';

/**
 * `GetAllPokemonQueryHandler` is a query handler class for `GetAllPokemonQuery`.
 */
@QueryHandler(GetAllPokemonQuery)
export class GetAllPokemonQueryHandler implements IQueryHandler<GetAllPokemonQuery, Pagination<Pokemon>> {
    /**
     * @param _app - Application for getting all pokémon.
     */
    constructor(private readonly _app: GetAllPokemonApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The list of pokémon.
     */
    execute(query: GetAllPokemonQuery): Promise<Pagination<Pokemon>> {
        return this._app.exec(query.page, query.limit, query.nameFilter);
    }
}
