import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateUserAccessTokenQuery } from './validate-user-access-token.query';
import { UserAuthData } from '../../../domain/user-auth-data';
import { ValidateUserAccessTokenApplication } from './validate-user-access-token.application';

/**
 * Query handler for the `ValidateUserAccessTokenQuery`.
 */
@QueryHandler(ValidateUserAccessTokenQuery)
export class ValidateUserAccessTokenQueryHandler
    implements IQueryHandler<ValidateUserAccessTokenQuery, UserAuthData | undefined>
{
    /**
     * @param _app - The application for validating user access tokens.
     */
    constructor(private readonly _app: ValidateUserAccessTokenApplication) {}

    /**
     * Executes the `ValidateUserAccessTokenQuery`.
     * @param query - The query to execute.
     * @returns `UserAuthData` - The user authentication data if the token is valid, otherwise `undefined`.
     */
    execute(query: ValidateUserAccessTokenQuery): Promise<UserAuthData | undefined> {
        return this._app.exec(query.accessToken);
    }
}
