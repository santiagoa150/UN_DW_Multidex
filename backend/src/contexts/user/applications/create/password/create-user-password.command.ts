import { ICommand } from '@nestjs/cqrs';

/**
 * The `CreateUserPasswordCommand` class is a command used to create a password for a user.
 */
export class CreateUserPasswordCommand implements ICommand {
    /**
     * @param userId - The user's unique identifier.
     * @param rawPassword - The user's raw password.
     */
    constructor(
        public readonly userId: string,
        public readonly rawPassword: string,
    ) {}
}
