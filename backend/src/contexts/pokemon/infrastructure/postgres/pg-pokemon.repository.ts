import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PgPokemonModel } from './pg-pokemon.model';
import { Pokemon } from '../../domain/pokemon';
import { PokemonMappers } from '../mappers/pokemon.mappers';
import { PgPokemonTypeModel } from './pg-pokemon-type.model';
import { PgUserModel } from '../../../user/infrastructure/postgres/pg-user.model';
import { PokemonType } from '../../domain/pokemon-type';
import { PokemonTypeMappers } from '../mappers/pokemon-type.mappers';
import { PokemonMovement } from '../../domain/pokemon-movement';
import { PgPokemonTypeRelationModel } from './pg-pokemon-type-relation.model';
import { PgPokemonMovementModel } from './pg-pokemon-movement.model';
import { PokemonMovementMappers } from '../mappers/pokemon-movement.mappers';
import { PokemonEvolutionChain } from '../../domain/pokemon-evolution-chain';
import { PokemonEvolutionChainMapper } from '../mappers/pokemon-evolution-chain.mappers';
import { PgPokemonEvolutionChainModel } from './pg-pokemon-evolution-chain.model';
import { PokemonDetails } from '../../domain/pokemon-details';

/**
 * The Pokémon repository for Postgres.
 */
@Injectable()
export class PgPokemonRepository implements PokemonRepository {
    private readonly _logger: Logger = new Logger(PgPokemonRepository.name);

    /**
     * @param _pgPokemonModel - The Postgres Pokémon model.
     * @param _pgPokemonTypeModel - The Postgres Pokémon type model.
     * @param _pgPokemonTypeRelationModel - The Postgres Pokémon type relation model.
     * @param _pgPokemonMovementModel - The Postgres Pokémon movement model.
     */
    constructor(
        @InjectModel(PgPokemonModel) private readonly _pgPokemonModel: typeof PgPokemonModel,
        @InjectModel(PgPokemonTypeModel) private readonly _pgPokemonTypeModel: typeof PgPokemonTypeModel,
        @InjectModel(PgPokemonTypeRelationModel)
        private readonly _pgPokemonTypeRelationModel: typeof PgPokemonTypeRelationModel,
        @InjectModel(PgPokemonMovementModel) private readonly _pgPokemonMovementModel: typeof PgPokemonMovementModel,
        @InjectModel(PgPokemonEvolutionChainModel)
        private readonly _pgPokemonEvolutionChainModel: typeof PgPokemonEvolutionChainModel,
    ) {}

    /**
     * Create a new Pokémon.
     * @param id The id of the Pokémon.
     * @param name The name of the Pokémon.
     * @param pokemonTypes The types of the Pokémon.
     * @param frontImageUrl The front image URL of the Pokémon.
     * @param description The description of the Pokémon.
     * @param weight The weight of the Pokémon.
     * @param height The height of the Pokémon.
     * @param hp The HP of the Pokémon.
     * @param attack The attack of the Pokémon.
     * @param defense The defense of the Pokémon.
     * @param specialAttack The special attack of the Pokémon.
     * @param specialDefense The special defense of the Pokémon.
     * @param speed The speed of the Pokémon.
     * @param movements The movements of the Pokémon.
     * @returns The created Pokémon.
     */
    async create(
        id: number,
        name: string,
        pokemonTypes: number[],
        frontImageUrl: string,
        description: string,
        weight: number,
        height: number,
        hp: number,
        attack: number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
        movements: PokemonMovement[],
    ): Promise<void> {
        this._logger.log(`[${this.create.name}] INIT :: id: ${id}`);
        await this._pgPokemonModel.create({
            id,
            name,
            height,
            weight,
            frontImageUrl,
            description,
            hp,
            attack,
            defense,
            specialAttack,
            speed,
            specialDefense,
        });
        await this._pgPokemonTypeRelationModel.bulkCreate(
            pokemonTypes.map((pokemonTypeId, i) => ({
                pokemonId: id,
                pokemonTypeId,
                order: i + 1,
            })),
        );
        await this._pgPokemonMovementModel.bulkCreate(PokemonMovementMappers.pokemonMovements2DTOs(movements));
        this._logger.log(`[${this.create.name}] FINISH ::`);
    }

    /**
     * Create a new Pokémon movement.
     * @param chain - The Pokémon movements to create.
     */
    async createEvolutionChain(chain: PokemonEvolutionChain[]): Promise<void> {
        this._logger.log(`[${this.createEvolutionChain.name}] INIT ::`);
        await this._pgPokemonEvolutionChainModel.bulkCreate(PokemonEvolutionChainMapper.evolutionChains2DTOs(chain));
        this._logger.log(`[${this.createEvolutionChain.name}] FINISH ::`);
    }

    /**
     * Retrieves all Pokémon types.
     * @returns A promise that resolves to all Pokémon types.
     */
    async getAllPokemonTypes(): Promise<PokemonType[]> {
        this._logger.log(`[${this.getAllPokemonTypes.name}] INIT ::`);
        const found: PgPokemonTypeModel[] = await this._pgPokemonTypeModel.findAll();
        const mapped: PokemonType[] = PokemonTypeMappers.DTOs2PokemonTypes(found);
        this._logger.log(`[${this.getAllPokemonTypes.name}] FINISH ::`);
        return mapped;
    }

    /**
     * Retrieves a Pokémon by its id.
     * @param id - The id of the Pokémon to retrieve.
     * @returns A promise that resolves to the Pokémon, or `undefined` if the Pokémon is not found.
     */
    async getById(id: number): Promise<Pokemon | undefined> {
        this._logger.log(`[${this.getById.name}] INIT :: id: ${id}`);
        const found: PgPokemonModel = await this._pgPokemonModel.findOne({
            include: [
                {
                    model: PgPokemonTypeModel,
                    order: [['order', 'ASC']],
                },
                {
                    model: PgUserModel,
                },
            ],
            where: { id },
        });
        const mapped: Pokemon | undefined = found ? PokemonMappers.DTO2Pokemon(found) : undefined;
        this._logger.log(`[${this.getById.name}] FINISH ::`);
        return mapped;
    }

        async getDetailsById(id: number): Promise<PokemonDetails | undefined>{
            const pokemon = await this.getById(id)
            if (!pokemon){
                return undefined;
            }
            const movements = await this._pgPokemonMovementModel.findAll({
                where: {pokemonId:id}
            })
            const pokemonChain = await this._pgPokemonEvolutionChainModel.findOne({
                where: {pokemonId:id}
            })
        
            const evolutionChain = await this._pgPokemonEvolutionChainModel.findAll({
                where: {chainId:pokemonChain.chainId},
                include: [
                    {
                        model: PgPokemonModel, 
                        as: "pokemon"
                    }
                ]
            })

            const pokemonDetails = new PokemonDetails(
                pokemon, 
                PokemonMovementMappers.DTOS2pokemonMovements(movements),
                evolutionChain.map((e) => PokemonMappers.DTO2Pokemon(e.pokemon))
            )
            return pokemonDetails;
        }

}
