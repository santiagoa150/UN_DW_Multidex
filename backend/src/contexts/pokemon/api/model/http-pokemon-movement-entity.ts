import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PokemonMovementDto } from '../../infrastructure/pokemon-movement.dto';

export class HttpPokemonMovementEntity implements PokemonMovementDto {
    @ApiProperty({ description: 'The entity id.' })
    @Type(() => Number)
    pokemonId: number;

    @ApiProperty({ description: 'The entity name.' })
    name: string;

    @ApiProperty()
    levelLearnedAt: number;
}
