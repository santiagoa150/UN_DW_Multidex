import { PokemonTypeDto } from '../pokemon-type.dto';
import { PokemonType } from '../../domain/pokemon-type';

/**
 * Utility class to map DTOs to Pokémon type entities.
 */
export class PokemonTypeMappers {
    /**
     * Maps a Pokémon type DTO to a Pokémon type entity.
     * @param dto - The Pokémon type DTO to map.
     * @returns A new Pokémon type entity.
     */
    static DTO2PokemonType(dto: PokemonTypeDto): PokemonType {
        return new PokemonType(dto.id, dto.name);
    }

    /**
     * Maps a list of Pokémon type DTOs to a list of Pokémon type entities.
     * @param DTOs - The list of Pokémon type DTOs to map.
     * @returns A new list of Pokémon type entities.
     */
    static DTOs2PokemonTypes(DTOs: PokemonTypeDto[]): PokemonType[] {
        return DTOs.map((dto) => this.DTO2PokemonType(dto));
    }
}
