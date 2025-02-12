import { UniverseEntity } from '../domain/universe-entity';
import { UniverseEntityDto } from './universe-entity.dto';

/**
 * Utility class to map universe entities.
 */
export abstract class UniverseEntityMappers {
    /**
     * Maps a `UniverseEntity` domain object to a `UniverseEntityDto` object.
     * @param entity - The `UniverseEntity` object to map.
     * @returns A new `UniverseEntityDto` object.
     */
    static UniverseEntity2DTO(entity: UniverseEntity): UniverseEntityDto {
        return {
            creatorId: entity.creatorId,
            creatorName: entity.creatorName,
            description: entity.description,
            entityTypes: Array.from(entity.entityTypes),
            frontImageUrl: entity.frontImageUrl,
            gender: entity.gender,
            height: entity.height,
            id: entity.id,
            location: entity.location,
            name: entity.name,
            origin: entity.origin,
            status: entity.status,
            universeType: entity.universeType,
            weight: entity.weight,
        };
    }
}
