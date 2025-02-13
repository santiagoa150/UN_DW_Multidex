import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUniverseTypeCommand } from './update-universe-type.command';
import { UpdateUniverseTypeApplication } from './update-universe-type.application';

/**
 * `UpdateUniverseTypeCommandHandler` is a command handler class that is responsible for updating universe type entities.
 */
@CommandHandler(UpdateUniverseTypeCommand)
export class UpdateUniverseTypeCommandHandler implements ICommandHandler<UpdateUniverseTypeCommand, void> {
    /**
     * @param _app - The Update Universe Type application instance.
     */
    constructor(private readonly _app: UpdateUniverseTypeApplication) {}

    /**
     * Executes the command.
     * @param command - The command to execute.
     */
    execute(command: UpdateUniverseTypeCommand): Promise<void> {
        return this._app.exec(command.universeType);
    }
}
