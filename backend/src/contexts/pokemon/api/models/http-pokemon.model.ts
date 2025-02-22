import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PokemonDto } from '../../infrastructure/pokemon.dto';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PokemonExceptionMessagesConstants } from '../../domain/exceptions/pokemon-exception-messages.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { UniverseExceptionMessagesConstants } from '../../../universe/domain/exceptions/universe-exception-messages.constants';

/**
 * Represents a pokémon entity in the HTTP layer.
 */
export class HttpPokemonModel implements PokemonDto {
    @ApiProperty({ description: 'The pokemon Id' })
    @IsInt({ message: PokemonExceptionMessagesConstants.POKEMON_ID_MUST_BE_A_INTEGER })
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'The pokemon name.' })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_NAME_IS_REQUIRED })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_NAME_MUST_BE_A_STRING })
    name: string;

    @ApiProperty({ description: 'The universe type.' })
    @IsEnum(UniverseTypeNameConstants, { message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_NOT_VALID })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_MUST_BE_A_STRING })
    universeType: string;

    @ApiProperty({ description: 'The pokemon types.' })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_ARE_REQUIRED })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_MUST_BE_STRINGS })
    @IsArray({ message: PokemonExceptionMessagesConstants.POKEMON_TYPES_MUST_BE_AN_ARRAY })
    entityTypes: string[];

    @ApiProperty({ description: 'The URL of the image that represents the pokemon.' })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_FRONT_IMAGE_URL_IS_REQUIRED })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_FRONT_IMAGE_URL_MUST_BE_A_STRING })
    frontImageUrl: string;

    @ApiProperty({ description: 'The description of the pokemon.' })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_DESCRIPTION_IS_REQUIRED })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_DESCRIPTION_MUST_BE_A_STRING })
    description: string;

    @ApiProperty({ description: 'The height of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_HEIGHT_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_HEIGHT_IS_REQUIRED })
    height: number;

    @ApiProperty({ description: 'The weight of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_WEIGHT_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_WEIGHT_IS_REQUIRED })
    weight: number;

    @ApiProperty({ description: 'The attack of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_ATTACK_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_ATTACK_IS_REQUIRED })
    attack: number;

    @ApiProperty({ description: 'The defense of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_DEFENSE_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_DEFENSE_IS_REQUIRED })
    defense: number;

    @ApiProperty({ description: 'The special attack of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_HP_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_HP_IS_REQUIRED })
    hp: number;

    @ApiProperty({ description: 'The special defense of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_SPECIAL_ATTACK_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_SPECIAL_ATTACK_IS_REQUIRED })
    specialAttack: number;

    @ApiProperty({ description: 'The special defense of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_SPECIAL_DEFENSE_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_SPECIAL_DEFENSE_IS_REQUIRED })
    specialDefense: number;

    @ApiProperty({ description: 'The speed of the pokemon.' })
    @IsNumber({}, { message: PokemonExceptionMessagesConstants.POKEMON_SPEED_MUST_BE_A_NUMBER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_SPEED_IS_REQUIRED })
    speed: number;

    @ApiProperty({ description: 'The creator id.' })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_CREATOR_ID_MUST_BE_A_STRING })
    @IsOptional()
    creatorId?: string;

    @ApiProperty({ description: 'The creator name.' })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_CREATOR_NAME_MUST_BE_A_STRING })
    @IsOptional()
    creatorName?: string;
}
