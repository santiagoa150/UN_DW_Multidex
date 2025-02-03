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
            id: entity.id,
            name: entity.name,
            type: entity.type,
        };
    }
}
