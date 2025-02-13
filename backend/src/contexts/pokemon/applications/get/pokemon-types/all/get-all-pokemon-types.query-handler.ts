import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPokemonTypesQuery } from './get-all-pokemon-types.query';
import { PokemonType } from '../../../../domain/pokemon-type';
import { GetAllPokemonTypesApplication } from './get-all-pokemon-types.application';

/**
 * Query handler for the `GetAllPokemonTypesQuery`.
 */
@QueryHandler(GetAllPokemonTypesQuery)
export class GetAllPokemonTypesQueryHandler implements IQueryHandler<GetAllPokemonTypesQuery, PokemonType[]> {
    /**
     * @param _app - The application to handle the query.
     */
    constructor(private readonly _app: GetAllPokemonTypesApplication) {}

    /**
     * Executes the query.
     * @returns All pokémon types.
     */
    execute(): Promise<PokemonType[]> {
        return this._app.exec();
    }
}
