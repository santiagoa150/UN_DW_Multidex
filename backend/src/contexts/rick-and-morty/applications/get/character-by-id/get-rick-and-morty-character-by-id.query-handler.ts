import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRickAndMortyCharacterByIdQuery } from './get-rick-and-morty-character-by-id.query';
import { RickAndMortyCharacter } from '../../../domain/rick-and-morty-character';
import { GetRickAndMortyCharacterByIdApplication } from './get-rick-and-morty-character-by-id.application';

/**
 * Query handler for the `GetRickAndMortyCharacterByIdQuery`.
 */
@QueryHandler(GetRickAndMortyCharacterByIdQuery)
export class GetRickAndMortyCharacterByIdQueryHandler
    implements IQueryHandler<GetRickAndMortyCharacterByIdQuery, RickAndMortyCharacter>
{
    /**
     * @param _app - The application to handle the query.
     */
    constructor(private readonly _app: GetRickAndMortyCharacterByIdApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The Rick and Morty character with the specified ID.
     */
    execute(query: GetRickAndMortyCharacterByIdQuery): Promise<RickAndMortyCharacter> {
        return this._app.exec(query.id);
    }
}
