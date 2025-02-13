import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoadPokemonCommand } from './load-pokemon.command';
import { LoadPokemonApplication } from './load-pokemon.application';

/**
 * `LoadPokemonCommandHandler` is responsible for handling the `LoadPokemonCommand` event.
 */
@CommandHandler(LoadPokemonCommand)
export class LoadPokemonCommandHandler implements ICommandHandler<LoadPokemonCommand, void> {
    /**
     * @param _app - The application to handle the event.
     */
    constructor(private readonly _app: LoadPokemonApplication) {}

    /**
     * Executes the event.
     * @param command - The event to execute.
     */
    execute(command: LoadPokemonCommand): Promise<void> {
        return this._app.exec(command.universeType);
    }
}
