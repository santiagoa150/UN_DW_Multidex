import { ICommand } from '@nestjs/cqrs';

/**
 * Command to create Pokémon types.
 */
export class CreatePokemonTypesCommand implements ICommand {}
