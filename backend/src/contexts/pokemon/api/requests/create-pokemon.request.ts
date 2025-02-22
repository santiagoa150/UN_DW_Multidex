import { ApiProperty, PickType } from '@nestjs/swagger';
import { HttpPokemonModel } from '../models/http-pokemon.model';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PokemonExceptionMessagesConstants } from '../../domain/exceptions/pokemon-exception-messages.constants';

/**
 * Represents a request to create a Pokémon.
 */
export class CreatePokemonRequest extends PickType(HttpPokemonModel, [
    'name',
    'description',
    'frontImageUrl',
    'attack',
    'defense',
    'height',
    'hp',
    'weight',
    'speed',
    'specialDefense',
    'specialAttack',
]) {
    @ApiProperty({ description: 'The pokémon movements.', type: [String] })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENTS_MUST_BE_STRINGS, each: true })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENTS_AREA_REQUIRED, each: true })
    @IsArray({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENTS_MUST_BE_AN_ARRAY })
    movements: string[];

    @ApiProperty({ description: 'The pokémon types.', type: [Number] })
    @IsInt({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_MUST_BE_INTEGERS, each: true })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_ARE_REQUIRED, each: true })
    @IsArray({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_MUST_BE_AN_ARRAY })
    types: number[];

    @ApiProperty({ description: 'Id of the evolving pokemon' })
    @IsInt({ message: PokemonExceptionMessagesConstants.POKEMON_EVOLVES_FROM_MUST_BE_A_INTEGER })
    @IsOptional()
    evolvesFrom?: number;
}
