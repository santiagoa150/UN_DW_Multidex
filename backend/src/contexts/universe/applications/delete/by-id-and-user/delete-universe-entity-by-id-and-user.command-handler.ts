import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUniverseEntityByIdAndUserCommand } from './delete-universe-entity-by-id-and-user.command';
import { DeleteUniverseEntityByIdAndUserApplication } from './delete-universe-entity-by-id-and-user.application';

/**
 * Command handler for the `DeleteUniverseEntityByIdAndUserCommand`.
 */
@CommandHandler(DeleteUniverseEntityByIdAndUserCommand)
export class DeleteUniverseEntityByIdAndUserCommandHandler
    implements ICommandHandler<DeleteUniverseEntityByIdAndUserCommand, void>
{
    /**
     * @param _app - The application for deleting a universe entity.
     */
    constructor(private readonly _app: DeleteUniverseEntityByIdAndUserApplication) {}

    /**
     * Executes the `DeleteUniverseEntityByIdAndUserCommand`.
     * @param command - The command to execute.
     */
    execute(command: DeleteUniverseEntityByIdAndUserCommand): Promise<void> {
        return this._app.exec(command.id, command.userId, command.universeType);
    }
}
