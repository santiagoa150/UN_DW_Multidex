import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserAccessTokenCommand } from './create-user-access-token.command';
import { CreateUserAccessTokenApplication } from './create-user-access-token.application';

/**
 * `CreateUserAccessTokenCommandHandler` is responsible for handling the `CreateUserAccessTokenCommand`.
 */
@CommandHandler(CreateUserAccessTokenCommand)
export class CreateUserAccessTokenCommandHandler implements ICommandHandler<CreateUserAccessTokenCommand, string> {
    /**
     * @param app - The application that contains the logic for creating user access tokens.
     */
    constructor(private readonly app: CreateUserAccessTokenApplication) {}

    /**
     * Executes the command to create a user access token.
     * @param command - The command containing the user's auth data.
     * @returns A promise that resolves to the generated access token.
     */
    async execute(command: CreateUserAccessTokenCommand): Promise<string> {
        return this.app.exec(command.authData);
    }
}
