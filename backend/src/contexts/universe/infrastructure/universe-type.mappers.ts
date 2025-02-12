import { UniverseTypeDto } from './universe-type.dto';
import { UniverseType } from '../domain/universe-type';
import { UniverseTypeNameConstants } from '../domain/constants/universe-type-name.constants';

/**
 * Utility class to map universe types.
 */
export abstract class UniverseTypeMappers {

    /**
     * Maps a `UniverseType` domain object to a `UniverseTypeDto` object.
     * @param dto - The `UniverseTypeDto` object to map.
     * @returns A new `UniverseType` object.
     */
    static DTO2UniverseType(dto: UniverseTypeDto): UniverseType {
        return new UniverseType(
            dto.name as UniverseTypeNameConstants,
            dto.priority,
            dto.taskWasExecuted,
        );
    }

    /**
     * Maps a list of `UniverseTypeDto` objects to a list of `UniverseType` objects.
     * @param DTOs - The list of `UniverseTypeDto` objects to map.
     * @returns A new list of `UniverseType` objects.
     */
    static DTOs2UniverseTypes(DTOs: UniverseTypeDto[]): UniverseType[] {
        return DTOs.map((dto) => this.DTO2UniverseType(dto));
    }
}