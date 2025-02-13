import { IQuery } from '@nestjs/cqrs';

/**
 * Query to get all Pokémon types.
 */
export class GetAllPokemonTypesQuery implements IQuery {}
