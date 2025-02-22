import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { PokemonMovement } from '../../domain/pokemon-movement';
import { PokemonEvolutionChain } from '../../domain/pokemon-evolution-chain';
import { QueryBus } from '@nestjs/cqrs';
import { GetPokemonByIdQuery } from '../get/pokemon/by-id/get-pokemon-by-id.query';
import { v4 as uuidV4 } from 'uuid';

/**
 * Create Pokémon Application
 */
export class CreatePokemonApplication {
    private readonly _logger: Logger = new Logger(CreatePokemonApplication.name);

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
     */
    async exec(
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
        this._logger.log(`[${this.exec.name}] INIT :: Pokémon name: ${name}`);
        if (evolvesFrom) {
            await this._queryBus.execute(new GetPokemonByIdQuery(evolvesFrom));
        }
        const mappedMovements = movements.map((pM) => new PokemonMovement(0, pM, 0));
        const pokemon = await this._repository.create(
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
            undefined,
            userId,
        );
        let newEvolutionChain: PokemonEvolutionChain;
        if (evolvesFrom) {
            const evolutionChain = await this._repository.getEvolutionChainByPokemon(evolvesFrom);
            newEvolutionChain = new PokemonEvolutionChain(evolutionChain.chainId, pokemon.id, evolvesFrom);
        } else {
            newEvolutionChain = new PokemonEvolutionChain(uuidV4(), pokemon.id, undefined);
        }
        await this._repository.createEvolutionChain([newEvolutionChain]);
        this._logger.log(`[${this.exec.name}] FINISH :: Pokémon name: ${name}`);
    }
}
