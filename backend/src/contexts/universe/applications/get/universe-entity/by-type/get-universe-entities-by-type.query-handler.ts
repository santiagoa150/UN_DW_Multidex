import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUniverseEntitiesByTypeQuery } from './get-universe-entities-by-type.query';
import { Pagination } from '../../../../../shared/domain/pagination';
import { UniverseEntity } from '../../../../domain/universe-entity';
import { GetUniverseEntitiesByTypeApplication } from './get-universe-entities-by-type.application';

/**
 * Query handler for `GetUniverseEntitiesByTypeQuery`.
 */
@QueryHandler(GetUniverseEntitiesByTypeQuery)
export class GetUniverseEntitiesByTypeQueryHandler
    implements IQueryHandler<GetUniverseEntitiesByTypeQuery, Pagination<UniverseEntity>>
{
    /**
     * @param _app - The application for getting universe entities by type.
     */
    constructor(private readonly _app: GetUniverseEntitiesByTypeApplication) {}

    /**
     * Executes the query.
     * @param query - The query.
     * @returns The universe entities.
     */
    execute(query: GetUniverseEntitiesByTypeQuery): Promise<Pagination<UniverseEntity>> {
        return this._app.exec(query.universeType, query.page, query.limit, query.nameFilter);
    }
}
