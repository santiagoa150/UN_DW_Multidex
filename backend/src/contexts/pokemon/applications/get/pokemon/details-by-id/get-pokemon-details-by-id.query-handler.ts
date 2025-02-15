import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Pokemon } from '../../../../domain/pokemon';
import { GetPokemonDetailsByIdQuery } from './get-pokemon-details-by-id.query';
import { GetPokemonDetailsByIdApplication } from './get-pokemon-details-by-id.application';
import { PokemonDetails } from 'src/contexts/pokemon/domain/pokemon-details';


@QueryHandler(GetPokemonDetailsByIdQuery)
export class GetPokemonDetailsByIdQueryHandler implements IQueryHandler<GetPokemonDetailsByIdQuery, PokemonDetails> {

    constructor(private readonly _app: GetPokemonDetailsByIdApplication) {}


    execute(query: GetPokemonDetailsByIdQuery): Promise<PokemonDetails> {
        return this._app.exec(query.id);
    }
}