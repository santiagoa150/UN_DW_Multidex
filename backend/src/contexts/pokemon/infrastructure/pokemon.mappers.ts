import { UniverseEntityMappers } from '../../universe/infrastructure/universe-entity.mappers';
import { PokemonDto } from './pokemon.dto';
import { Pokemon } from '../domain/pokemon';
import { UniverseTypeNameConstants } from '../../universe/domain/constants/universe-type-name.constants';

/**
 * Utility class to map DTOs to Pokémon entities.
 */
export abstract class PokemonMappers extends UniverseEntityMappers {
    /**
     * Maps a Pokémon DTO to a Pokémon entity.
     * @param dto - The Pokémon DTO to map.
     * @returns A new Pokémon entity.
     */
    static DTO2Pokemon(dto: PokemonDto): Pokemon {
        return new Pokemon(
            dto.id,
            dto.name,
            dto.universeType as UniverseTypeNameConstants,
            new Set(dto.entityTypes),
            dto.frontImageUrl,
            dto.description,
            dto.height,
            dto.weight,
        );
    }
}
