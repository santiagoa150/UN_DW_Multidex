import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PokemonMovementDto } from '../../infrastructure/pokemon-movement.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PokemonExceptionMessagesConstants } from '../../domain/exceptions/pokemon-exception-messages.constants';

/**
 * Represents a pokémon movement model in the HTTP layer.
 */
export class HttpPokemonMovementModel implements PokemonMovementDto {
    @ApiProperty({ description: 'The entity id.' })
    @IsInt({ message: PokemonExceptionMessagesConstants.POKEMON_ID_MUST_BE_A_INTEGER })
    @Type(() => Number)
    pokemonId: number;

    @ApiProperty({ description: 'The pokemon movement name.' })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENT_NAME_IS_REQUIRED })
    @IsString({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENT_NAME_MUST_BE_A_STRING })
    name: string;

    @ApiProperty({ description: 'The level at which the pokemon learns the movement.' })
    @IsInt({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENT_LEVEL_LEARNED_AT_MUST_BE_A_INTEGER })
    @IsNotEmpty({ message: PokemonExceptionMessagesConstants.POKEMON_MOVEMENT_LEVEL_LEARNED_AT_IS_REQUIRED })
    levelLearnedAt: number;
}
