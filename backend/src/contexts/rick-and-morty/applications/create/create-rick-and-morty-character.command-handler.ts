import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRickAndMortyCharacterCommand } from './create-rick-and-morty-character.command';
import { CreateRickAndMortyCharacterApplication } from './create-rick-and-morty-character.application';

/**
 * Command handler for the CreateRickAndMortyCharacterCommand.
 */
@CommandHandler(CreateRickAndMortyCharacterCommand)
export class CreateRickAndMortyCharacterCommandHandler
    implements ICommandHandler<CreateRickAndMortyCharacterCommand, void>
{
    /**
     * @param _app - The CreateRickAndMortyCharacterApplication instance.
     */
    constructor(private readonly _app: CreateRickAndMortyCharacterApplication) {}

    /**
     * Executes the CreateRickAndMortyCharacterCommand.
     * @param command - The CreateRickAndMortyCharacterCommand instance.
     */
    async execute(command: CreateRickAndMortyCharacterCommand): Promise<void> {
        return this._app.exec(
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
