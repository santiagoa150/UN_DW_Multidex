import { UniverseEntityMappers } from '../../universe/infrastructure/universe-entity.mappers';
import { RickAndMortyCharacterDto } from './rick-and-morty-character.dto';
import { RickAndMortyCharacter } from '../domain/rick-and-morty-character';
import { UniverseTypeNameConstants } from '../../universe/domain/constants/universe-type-name.constants';

/**
 * Utility class to map DTOs to Rick and Morty character entities.
 */
export class RickAndMortyCharacterMappers extends UniverseEntityMappers {
    /**
     * Maps a Rick and Morty character DTO to a Rick and Morty character entity.
     * @param dto - The Rick and Morty character DTO to map.
     * @returns A new Rick and Morty character entity.
     */
    static DTO2RickAndMortyCharacter(dto: RickAndMortyCharacterDto): RickAndMortyCharacter {
        return new RickAndMortyCharacter(dto.id, dto.name, dto.type as UniverseTypeNameConstants);
    }
}
