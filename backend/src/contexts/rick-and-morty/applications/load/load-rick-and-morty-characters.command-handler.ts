import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoadRickAndMortyCharactersApplication } from './load-rick-and-morty-characters.application';
import { LoadRickAndMortyCharactersCommand } from './load-rick-and-morty-characters.command';

/**
 * `LoadRickAndMortyCharactersCommandHandler` is responsible for handling the `LoadPokemonCommand` event.
 */
@CommandHandler(LoadRickAndMortyCharactersCommand)
export class LoadRickAndMortyCharactersCommandHandler
    implements ICommandHandler<LoadRickAndMortyCharactersCommand, void>
{
    /**
     * @param _app - The application that loads Rick and Morty characters.
     */
    constructor(private readonly _app: LoadRickAndMortyCharactersApplication) {}

    /**
     * Executes the `LoadRickAndMortyCharactersCommand` event.
     * @param command - The command to execute.
     */
    execute(command: LoadRickAndMortyCharactersCommand): Promise<void> {
        return this._app.exec(command.universeType);
    }
}
