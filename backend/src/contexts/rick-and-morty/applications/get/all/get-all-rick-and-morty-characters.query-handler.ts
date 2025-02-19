import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRickAndMortyCharactersQuery } from './get-all-rick-and-morty-characters.query';
import { Pagination } from '../../../../shared/domain/pagination';
import { RickAndMortyCharacter } from '../../../domain/rick-and-morty-character';
import { GetAllRickAndMortyCharactersApplication } from './get-all-rick-and-morty-characters.application';

/**
 * Query handler for getting all Rick and Morty characters.
 */
@QueryHandler(GetAllRickAndMortyCharactersQuery)
export class GetAllRickAndMortyCharactersQueryHandler
    implements IQueryHandler<GetAllRickAndMortyCharactersQuery, Pagination<RickAndMortyCharacter>>
{
    /**
     * @param _app - Application for getting all Rick and Morty characters.
     */
    constructor(private readonly _app: GetAllRickAndMortyCharactersApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The list of Rick and Morty characters.
     */
    execute(query: GetAllRickAndMortyCharactersQuery): Promise<Pagination<RickAndMortyCharacter>> {
        return this._app.exec(query.page, query.limit, query.nameFilter);
    }
}
