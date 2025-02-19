import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePokemonByIdAndUserCommand } from './delete-pokemon-by-id-and-user.command';
import { DeletePokemonByIdAndUserApplication } from './delete-pokemon-by-id-and-user.application';

/**
 * Command handler for the `DeletePokemonByIdAndUserCommand`.
 */
@CommandHandler(DeletePokemonByIdAndUserCommand)
export class DeletePokemonByIdAndUserCommandHandler implements ICommandHandler<DeletePokemonByIdAndUserCommand, void> {
    /**
     * @param _app - The application for deleting pokémon.
     */
    constructor(private readonly _app: DeletePokemonByIdAndUserApplication) {}

    /**
     * Executes the `DeletePokemonByIdAndUserCommand`.
     * @param command - The command to execute.
     */
    execute(command: DeletePokemonByIdAndUserCommand): Promise<void> {
        return this._app.exec(command.id, command.userId);
    }
}
