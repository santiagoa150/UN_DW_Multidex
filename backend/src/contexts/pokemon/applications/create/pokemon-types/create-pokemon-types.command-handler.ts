import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePokemonTypesCommand } from './create-pokemon-types.command';
import { PokemonType } from '../../../domain/pokemon-type';
import { CreatePokemonTypesApplication } from './create-pokemon-types.application';

/**
 * Create Pokémon Types Command Handler
 */
@CommandHandler(CreatePokemonTypesCommand)
export class CreatePokemonTypesCommandHandler implements ICommandHandler<CreatePokemonTypesCommand, PokemonType[]> {
    /**
     * @param _app - Create Pokémon Types Application
     */
    constructor(private readonly _app: CreatePokemonTypesApplication) {}

    /**
     * Execute the command
     * @returns The created Pokémon types.
     */
    execute(): Promise<PokemonType[]> {
        return this._app.exec();
    }
}
