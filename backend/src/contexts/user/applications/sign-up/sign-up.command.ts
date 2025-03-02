import { ICommand } from '@nestjs/cqrs';

/**
 * The `SignUpCommand` is a command that is used to sign up a user.
 */
export class SignUpCommand implements ICommand {
    /**
     * @param email - The user's email address.
     * @param username - The user's username.
     * @param password - The user's password.
     * @param names - The user's names.
     * @param lastNames - The user's last names.
     */
    constructor(
        public readonly email: string,
        public readonly username: string,
        public readonly password: string,
        public readonly names: string,
        public readonly lastNames: string,
    ) {}
}
