import { ICommand } from '@nestjs/cqrs';
import { UserAuthData } from '../../../domain/user-auth-data';

/**
 * The `CreateUserAuthTokensCommand` class is a command used to create authentication tokens for a user.
 */
export class CreateUserAccessTokenCommand implements ICommand {
    /**
     * @param authData - The user authentication data.
     */
    constructor(public readonly authData: UserAuthData) {}
}
