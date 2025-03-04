import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from '../../../domain/user';
import { GetUserByIdApplication } from './get-user-by-id.application';

/**
 * Query handler for getting a user by its id.
 */
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery, User> {
    /**
     * @param _app - The application to get a user by its id.
     */
    constructor(private readonly _app: GetUserByIdApplication) {}

    /**
     * Executes the query.
     * @param query - The query to execute.
     * @returns The user.
     */
    execute(query: GetUserByIdQuery): Promise<User> {
        return this._app.exec(query.userId);
    }
}
