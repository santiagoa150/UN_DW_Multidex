import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './create-pokemon.command';
import { CreatePokemonApplication } from './create-pokemon.application';

/**
 * Create Pokémon Command Handler
 */
@CommandHandler(CreatePokemonCommand)
export class CreatePokemonCommandHandler implements ICommandHandler<CreatePokemonCommand, void> {
    /**
     * @param _app - Create Pokémon Application
     */
    constructor(private readonly _app: CreatePokemonApplication) {}

    /**
     * Execute the command
     * @param command - Create Pokémon Command
     */
    execute(command: CreatePokemonCommand): Promise<void> {
        return this._app.exec(
            command.userId,
            command.name,
            command.description,
            command.frontImageUrl,
            command.attack,
            command.defense,
            command.height,
            command.hp,
            command.weight,
            command.speed,
            command.specialDefense,
            command.specialAttack,
            command.movements,
            command.types,
            command.evolvesFrom,
        );
    }
}
