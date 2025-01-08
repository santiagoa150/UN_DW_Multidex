import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from '../../../domain/user';
import { GetUserByEmailApplication } from './get-user-by-email.application';

/**
 * `GetUserByEmailQueryHandler` handles the `GetUserByEmailQuery`.
 */
@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery, User | undefined> {
    /**
     * @param app - An instance of `GetUserByEmailApplication` used to execute the query.
     */
    constructor(private readonly app: GetUserByEmailApplication) {}

    /**
     * Executes the `GetUserByEmailQuery`.
     * @param query - The `GetUserByEmailQuery` to execute.
     * @returns A promise that resolves to a `User` object if the user is found, or `undefined` if not.
     */
    execute(query: GetUserByEmailQuery): Promise<User> {
        return this.app.exec(query.email, query.throwExceptionIfNotFound);
    }
}
