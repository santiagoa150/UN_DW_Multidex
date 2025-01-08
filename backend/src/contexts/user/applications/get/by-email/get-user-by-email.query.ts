import { IQuery } from '@nestjs/cqrs';

/**
 * Represents a query to retrieve a user by their email address.
 */
export class GetUserByEmailQuery implements IQuery {
    /**
     * @param email - The email address of the user to retrieve.
     * @param [throwExceptionIfNotFound] - Optional flag indicating whether to throw an exception if the user is not found.
     */
    constructor(
        public readonly email: string,
        public readonly throwExceptionIfNotFound?: boolean,
    ) {}
}
