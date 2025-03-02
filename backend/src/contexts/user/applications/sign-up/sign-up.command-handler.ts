import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './sign-up.command';
import { SignUpApplication } from './sign-up.application';

/**
 * Sign up command handler.
 */
@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand, void> {
    /**
     * @param _app - Sign up application.
     */
    constructor(private readonly _app: SignUpApplication) {}

    /**
     * Executes the command.
     * @param command - Sign up command.
     */
    execute(command: SignUpCommand): Promise<void> {
        return this._app.exec(command.email, command.names, command.username, command.lastNames, command.password);
    }
}
