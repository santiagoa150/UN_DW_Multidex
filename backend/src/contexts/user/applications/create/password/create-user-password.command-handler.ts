import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserPasswordApplication } from './create-user-password.application';
import { CreateUserPasswordCommand } from './create-user-password.command';

@CommandHandler(CreateUserPasswordCommand)
export class CreateUserPasswordCommandHandler implements ICommandHandler<CreateUserPasswordCommand, string> {
    /**
     * @param app - The application service for creating a user password.
     */
    constructor(private readonly app: CreateUserPasswordApplication) {}

    /**
     * Executes the command.
     * @param command - The command to execute.
     * @returns The hashed password.
     */
    async execute(command: CreateUserPasswordCommand): Promise<string> {
        return this.app.exec(command.userId, command.rawPassword);
    }
}
