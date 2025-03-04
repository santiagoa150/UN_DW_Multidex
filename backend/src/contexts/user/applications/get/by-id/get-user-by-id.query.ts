import { IQuery } from '@nestjs/cqrs';

/**
 * Query to get a user by its id.
 */
export class GetUserByIdQuery implements IQuery {
    /**
     * @param userId - The user to get by its id.
     */
    constructor(public readonly userId: string) {}
}
