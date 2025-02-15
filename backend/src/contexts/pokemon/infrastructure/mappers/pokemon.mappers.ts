import { UniverseEntityMappers } from '../../../universe/infrastructure/mappers/universe-entity.mappers';
import { PokemonDto } from '../pokemon.dto';
import { Pokemon } from '../../domain/pokemon';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';

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
            dto.hp,
            dto.attack,
            dto.defense,
            dto.specialAttack,
            dto.specialDefense,
            dto.speed,
            dto.creatorId,
            dto.creatorName,
        );
    }

    static DTOs2Pokemon(DTOs: PokemonDto[]){
        return DTOs.map((dto) => this.DTO2Pokemon(dto)) 
    }

    static Pokemon2DTO(pokemon: Pokemon):PokemonDto{
        return {
            attack: pokemon.attack,
            defense: pokemon.defense,
            description: pokemon.description,
            height: pokemon.height,
            specialAttack: pokemon.specialAttack,
            specialDefense: pokemon.specialDefense,
            entityTypes: Array.from(pokemon.entityTypes),
            hp: pokemon.hp,
            frontImageUrl: pokemon.frontImageUrl,
            id: pokemon.id,
            name: pokemon.name,
            speed: pokemon.speed,
            universeType: pokemon.universeType,
            weight: pokemon.weight,
            creatorId: pokemon.creatorId,
            creatorName: pokemon.creatorName
        }
    }

    static Pokemon2DTOs(pokemon: Pokemon[]):PokemonDto[]{
        return pokemon.map((p) => this.Pokemon2DTO(p))
    }
}
