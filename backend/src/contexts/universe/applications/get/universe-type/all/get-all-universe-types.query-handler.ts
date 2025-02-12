import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUniverseTypesQuery } from './get-all-universe-types.query';
import { UniverseType } from '../../../../domain/universe-type';
import { GetAllUniverseTypesApplication } from './get-all-universe-types.application';

/**
 * Query handler for the `GetAllUniverseTypesQuery`.
 */
@QueryHandler(GetAllUniverseTypesQuery)
export class GetAllUniverseTypesQueryHandler implements IQueryHandler<GetAllUniverseTypesQuery, UniverseType[]> {
    /**
     * @param _app - The application to handle the query.
     */
    constructor(private readonly _app: GetAllUniverseTypesApplication) {}

    /**
     * Executes the query.
     * @returns All universe types.
     */
    execute(): Promise<UniverseType[]> {
        return this._app.exec();
    }
}
