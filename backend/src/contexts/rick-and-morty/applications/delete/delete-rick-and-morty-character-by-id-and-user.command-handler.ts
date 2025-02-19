import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRickAndMortyCharacterByIdAndUserCommand } from './delete-rick-and-morty-character-by-id-and-user.command';
import { DeleteRickAndMortyCharacterByIdAndUserApplication } from './delete-rick-and-morty-character-by-id-and-user.application';

/**
 * Command handler for the `DeleteRickAndMortyCharacterByIdAndUserCommand`.
 */
@CommandHandler(DeleteRickAndMortyCharacterByIdAndUserCommand)
export class DeleteRickAndMortyCharacterByIdAndUserCommandHandler
    implements ICommandHandler<DeleteRickAndMortyCharacterByIdAndUserCommand, void>
{
    /**
     * @param _app - The application for deleting Rick and Morty characters.
     */
    constructor(private readonly _app: DeleteRickAndMortyCharacterByIdAndUserApplication) {}

    /**
     * Executes the `DeleteRickAndMortyCharacterByIdAndUserCommand`.
     * @param command - The command to execute.
     */
    execute(command: DeleteRickAndMortyCharacterByIdAndUserCommand): Promise<void> {
        return this._app.exec(command.id, command.userId);
    }
}
