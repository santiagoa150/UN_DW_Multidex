import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetPokemonByIdQuery } from '../get/pokemon/by-id/get-pokemon-by-id.query';
import { Pokemon } from '../../domain/pokemon';
import { YouAreNotTheCreatorOfThePokemonException } from '../../domain/exceptions/you-are-not-the-creator-of-the-pokemon.exception';
import { PokemonMovement } from '../../domain/pokemon-movement';
import { PokemonEvolutionChain } from '../../domain/pokemon-evolution-chain';

/**
 * Update Pokémon Application
 */
export class UpdatePokemonApplication {
    private readonly _logger: Logger = new Logger(UpdatePokemonApplication.name);

    /**
     * @param _repository - Pokémon Repository
     * @param _queryBus - Query Bus
     */
    constructor(
        private readonly _repository: PokemonRepository,
        private readonly _queryBus: QueryBus,
    ) {}

    /**
     * Execute the application
     * @param userId - User ID
     * @param name - Pokémon name
     * @param description - Pokémon description
     * @param frontImageUrl - Pokémon front image URL
     * @param attack - Pokémon attack
     * @param defense - Pokémon defense
     * @param height - Pokémon height
     * @param hp - Pokémon HP
     * @param weight - Pokémon weight
     * @param speed - Pokémon speed
     * @param specialDefense - Pokémon special defense
     * @param specialAttack - Pokémon special attack
     * @param movements - Pokémon movements
     * @param types - Pokémon types
     * @param evolvesFrom - Pokémon evolves from
     * @param id - Pokémon ID
     */
    async exec(
        id: number,
        userId: string,
        name: string,
        description: string,
        frontImageUrl: string,
        attack: number,
        defense: number,
        height: number,
        hp: number,
        weight: number,
        speed: number,
        specialDefense: number,
        specialAttack: number,
        movements: string[],
        types: number[],
        evolvesFrom?: number,
    ): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: Pokémon ID: ${id}`);
        const pokemon = await this._queryBus.execute<GetPokemonByIdQuery, Pokemon>(new GetPokemonByIdQuery(id));
        if (pokemon.creatorId !== userId) {
            throw new YouAreNotTheCreatorOfThePokemonException();
        }
        const currentEvolutionChain = await this._repository.getEvolutionChainByPokemon(id);
        let newEvolutionChain: PokemonEvolutionChain;
        if (evolvesFrom) {
            await this._queryBus.execute(new GetPokemonByIdQuery(evolvesFrom));
            const preEvolutionChain = await this._repository.getEvolutionChainByPokemon(evolvesFrom);
            newEvolutionChain = new PokemonEvolutionChain(preEvolutionChain.chainId, pokemon.id, evolvesFrom);
        } else {
            newEvolutionChain = new PokemonEvolutionChain(currentEvolutionChain.chainId, pokemon.id, null);
        }
        const mappedMovements = movements.map((pM) => new PokemonMovement(0, pM, 0));
        console.log(mappedMovements);
        console.log(newEvolutionChain);
        await this._repository.update(
            id,
            name,
            types,
            frontImageUrl,
            description,
            weight,
            height,
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,
            mappedMovements,
            newEvolutionChain,
        );
        this._logger.log(`[${this.exec.name}] FINISH ::`);
    }
}
