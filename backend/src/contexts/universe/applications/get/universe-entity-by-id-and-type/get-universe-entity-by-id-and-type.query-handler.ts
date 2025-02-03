import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUniverseEntityByIdAndTypeQuery } from './get-universe-entity-by-id-and-type.query';
import { UniverseEntity } from '../../../domain/universe-entity';
import { GetUniverseEntityByIdAndTypeApplication } from './get-universe-entity-by-id-and-type.application';

/**
 * Query handler for the `GetUniverseEntityByIdAndTypeQuery`.
 */
@QueryHandler(GetUniverseEntityByIdAndTypeQuery)
export class GetUniverseEntityByIdAndTypeQueryHandler
    implements IQueryHandler<GetUniverseEntityByIdAndTypeQuery, UniverseEntity>
{
    /**
     * @param _app - The application to handle the query.
     */
    constructor(private readonly _app: GetUniverseEntityByIdAndTypeApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The universe entity with the specified ID and type.
     */
    execute(query: GetUniverseEntityByIdAndTypeQuery): Promise<UniverseEntity> {
        return this._app.exec(query.id, query.type);
    }
}
