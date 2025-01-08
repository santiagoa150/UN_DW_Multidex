import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { UserAuthData } from '../../domain/user-auth-data';
import { LoginApplication } from './login.application';

/**
 * `LoginCommandHandler` handles the `LoginCommand`.
 */
@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand, UserAuthData | undefined> {
    /**
     * @param app - An instance of `LoginApplication` used to execute the command.
     */
    constructor(private readonly app: LoginApplication) {}

    /**
     * Executes the `LoginCommand`.
     * @param command - The `LoginCommand` to execute.
     * @returns A promise that resolves to a `UserAuthData` object containing authentication information, or `undefined` if validation fails.
     */
    execute(command: LoginCommand): Promise<UserAuthData> {
        return this.app.exec(command.email, command.password);
    }
}
