import { PokemonMovement } from '../../domain/pokemon-movement';
import { PokemonMovementDto } from '../pokemon-movement.dto';

/**
 * Utility class for mapping Pokémon movement data.
 */
export class PokemonMovementMappers {
    /**
     * Maps a `PokemonMovement` domain object to a `PokemonMovementDto` object.
     * @param pokemonMovement - The `PokemonMovement` object to map.
     * @returns A new `PokemonMovementDto` object.
     */
    static pokemonMovement2DTO(pokemonMovement: PokemonMovement): PokemonMovementDto {
        return {
            levelLearnedAt: pokemonMovement.levelLearnedAt,
            name: pokemonMovement.name,
            pokemonId: pokemonMovement.pokemonId,
        };
    }

    /**
     * Maps a list of `PokemonMovement` domain objects to a list of `PokemonMovementDto` objects.
     * @param pokemonMovements - The list of `PokemonMovement` objects to map.
     * @returns A new list of `PokemonMovementDto` objects.
     */
    static pokemonMovements2DTOs(pokemonMovements: PokemonMovement[]): PokemonMovementDto[] {
        return pokemonMovements.map((pokemonMovement) => this.pokemonMovement2DTO(pokemonMovement));
    }

    static DTO2pokemonMovement(dto: PokemonMovementDto){
        return new PokemonMovement(dto.pokemonId, dto.name, dto.levelLearnedAt);
    }
    
    static DTOS2pokemonMovements(DTOs: PokemonMovementDto[]){
        return DTOs.map((dto) => this.DTO2pokemonMovement(dto)) 
    }
}
