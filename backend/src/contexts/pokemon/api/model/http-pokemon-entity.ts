import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PokemonDto } from '../../infrastructure/pokemon.dto';

export class HttpPokemonEntity implements PokemonDto {
    @ApiProperty({ description: 'The entity id.' })
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'The entity name.' })
    name: string;

    @ApiProperty({ description: 'The entity type.' })
    universeType: string;

    @ApiProperty({ description: 'The entity types.' })
    entityTypes: string[];

    @ApiProperty({ description: 'The URL of the image that represents the entity.' })
    frontImageUrl: string;

    @ApiProperty({ description: 'The description of the entity.' })
    description: string;

    @ApiProperty({ description: 'The height of the entity.' })
    height: number;

    @ApiProperty({ description: 'The weight of the entity.' })
    weight: number;

    @ApiProperty({ description: 'The creator id.' })
    creatorId?: string;

    @ApiProperty({ description: 'The creator name.' })
    creatorName?: string;
    
    @ApiProperty()
    attack: number;

    @ApiProperty()
    defense: number;

    @ApiProperty()
    hp: number;

    @ApiProperty()
    specialAttack: number;

    @ApiProperty()
    specialDefense: number;

    @ApiProperty()
    speed: number;
}
