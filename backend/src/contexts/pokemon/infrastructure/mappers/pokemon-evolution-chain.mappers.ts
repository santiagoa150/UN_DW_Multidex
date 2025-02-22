import { PokemonEvolutionChain } from '../../domain/pokemon-evolution-chain';
import { PokemonEvolutionChainDto } from '../pokemon-evolution-chain.dto';

/**
 * Mapper for Pokémon Evolution Chain
 */
export abstract class PokemonEvolutionChainMapper {
    /**
     * Maps a Pokémon Evolution Chain to a Pokémon Evolution Chain DTO.
     * @param evolutionChain - The Pokémon Evolution Chain to map.
     * @returns The Pokémon Evolution Chain DTO.
     */
    static evolutionChain2DTO(evolutionChain: PokemonEvolutionChain): PokemonEvolutionChainDto {
        return {
            chainId: evolutionChain.chainId,
            pokemonId: evolutionChain.pokemonId,
            evolvesFrom: evolutionChain.evolvesTo,
        };
    }

    /**
     * Maps a list of Pokémon Evolution Chains to a list of Pokémon Evolution Chain DTOs.
     * @param evolutionChains - The Pokémon Evolution Chains to map.
     * @returns The Pokémon Evolution Chain DTOs.
     */
    static evolutionChains2DTOs(evolutionChains: PokemonEvolutionChain[]): PokemonEvolutionChainDto[] {
        return evolutionChains.map(PokemonEvolutionChainMapper.evolutionChain2DTO);
    }

    /**
     * Maps a Pokémon Evolution Chain DTO to a Pokémon Evolution Chain.
     * @param dto - The Pokémon Evolution Chain DTO to map.
     * @returns The Pokémon Evolution Chain.
     */
    static DTO2EvolutionChain(dto: PokemonEvolutionChainDto): PokemonEvolutionChain {
        return new PokemonEvolutionChain(dto.chainId, dto.pokemonId, dto.evolvesFrom);
    }
}
