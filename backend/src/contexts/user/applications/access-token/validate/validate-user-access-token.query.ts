import { IQuery } from '@nestjs/cqrs';

/**
 * Query to validate the user access token.
 */
export class ValidateUserAccessTokenQuery implements IQuery {
    /**
     * @param accessToken - The access token to validate.
     */
    constructor(public readonly accessToken: string) {}
}
