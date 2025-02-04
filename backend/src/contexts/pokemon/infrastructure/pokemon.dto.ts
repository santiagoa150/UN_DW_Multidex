import { UniverseEntityDto } from '../../universe/infrastructure/universe-entity.dto';

/**
 * The `PokemonDto` type defines the shape of the data transfer object (DTO) for a Pokémon.
 */
export type PokemonDto = {
    height: number;
    weight: number;
} & Omit<UniverseEntityDto, 'status' | 'gender' | 'location' | 'origin'>;
