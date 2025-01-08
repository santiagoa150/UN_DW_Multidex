import { ICommand } from '@nestjs/cqrs';

/**
 * The `LoginCommand` is a command that is used to authenticate a user.
 */
export class LoginCommand implements ICommand {
    /**
     * @param email - The user's email address.
     * @param password - The user's password.
     */
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}
}
