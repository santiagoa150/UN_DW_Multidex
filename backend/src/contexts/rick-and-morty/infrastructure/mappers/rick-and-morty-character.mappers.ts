import { UniverseEntityMappers } from '../../../universe/infrastructure/mappers/universe-entity.mappers';
import { RickAndMortyCharacterDto } from '../rick-and-morty-character.dto';
import { RickAndMortyCharacter } from '../../domain/rick-and-morty-character';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';

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
        return new RickAndMortyCharacter(
            dto.id,
            dto.name,
            dto.universeType as UniverseTypeNameConstants,
            new Set<string>(dto.entityTypes),
            dto.frontImageUrl,
            dto.description,
            dto.status,
            dto.gender,
            dto.location,
            dto.origin,
            dto.creatorId,
            dto.creatorName,
        );
    }

    /**
     * Maps a list of Rick and Morty character DTOs to a list of Rick and Morty character entities.
     * @param DTOs - The list of Rick and Morty character DTOs to map.
     * @returns A new list of Rick and Morty character entities.
     */
    static DTOs2RickAndMortyCharacters(DTOs: RickAndMortyCharacterDto[]): RickAndMortyCharacter[] {
        return DTOs.map(RickAndMortyCharacterMappers.DTO2RickAndMortyCharacter);
    }
}
