import { UniverseEntityDto } from '../../universe/infrastructure/universe-entity.dto';

/**
 * The `RickAndMortyCharacterDto` type defines the shape of the data transfer object (DTO) for a Rick and Morty character.
 */
export type RickAndMortyCharacterDto = {
    status: string;
    gender: string;
    location: string;
    origin: string;
} & Omit<UniverseEntityDto, 'height' | 'weight'>;
