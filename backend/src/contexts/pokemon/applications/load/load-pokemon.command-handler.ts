import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoadUniverseEntitiesCommand } from '../../../universe/applications/load/load-universe-entities.command';
import { LoadPokemonApplication } from './load-pokemon.application';

/**
 * `LoadPokemonCommandHandler` is responsible for handling the `LoadUniverseEntitiesCommand` event.
 */
@CommandHandler(LoadUniverseEntitiesCommand)
export class LoadPokemonCommandHandler implements ICommandHandler<LoadUniverseEntitiesCommand, void> {
    /**
     * @param _app - The application to handle the event.
     */
    constructor(private readonly _app: LoadPokemonApplication) {}

    /**
     * Executes the event.
     * @param command - The event to execute.
     */
    execute(command: LoadUniverseEntitiesCommand): Promise<void> {
        return this._app.exec(command._universeType);
    }
}
