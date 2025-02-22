import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRickAndMortyCharacterCommand } from './update-rick-and-morty-character.command';
import { UpdateRickAndMortyCharacterApplication } from './update-rick-and-morty-character.application';

/**
 * Command handler for updating a Rick and Morty character.
 */
@CommandHandler(UpdateRickAndMortyCharacterCommand)
export class UpdateRickAndMortyCharacterCommandHandler
    implements ICommandHandler<UpdateRickAndMortyCharacterCommand, void>
{
    /**
     * @param _app - The application to be executed.
     */
    constructor(private readonly _app: UpdateRickAndMortyCharacterApplication) {}

    /**
     * Executes the command.
     * @param command - The command to be executed.
     */
    execute(command: UpdateRickAndMortyCharacterCommand): Promise<void> {
        return this._app.exec(
            command.id,
            command.userId,
            command.description,
            command.frontImageUrl,
            command.gender,
            command.location,
            command.name,
            command.origin,
            command.status,
            command.type,
        );
    }
}
