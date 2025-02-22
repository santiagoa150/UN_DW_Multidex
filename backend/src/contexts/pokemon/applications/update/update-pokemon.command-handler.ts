import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePokemonCommand } from './update-pokemon.command';
import { UpdatePokemonApplication } from './update-pokemon.application';

/**
 * Update Pokémon Command Handler
 */
@CommandHandler(UpdatePokemonCommand)
export class UpdatePokemonCommandHandler implements ICommandHandler<UpdatePokemonCommand, void> {
    /**
     * @param _app - Update Pokémon Application
     */
    constructor(private readonly _app: UpdatePokemonApplication) {}

    /**
     * Execute the command
     * @param command - Update Pokémon Command
     */
    execute(command: UpdatePokemonCommand): Promise<void> {
        return this._app.exec(
            command.id,
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
