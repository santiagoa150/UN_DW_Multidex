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
import { PokemonDetail } from '../../domain/pokemon-detail';
import { Pagination } from '../../../shared/domain/pagination';
import { Op } from 'sequelize';
import { PgPokemonConstants } from './pg-pokemon.constants';

/**
 * The Pokémon repository for Postgres.
 */
@Injectable()
export class PgPokemonRepository implements PokemonRepository {
    private readonly _logger: Logger = new Logger(PgPokemonRepository.name);

    /**
     * @param _pgPokemonModel - The Postgres Pokémon models.
     * @param _pgPokemonTypeModel - The Postgres Pokémon type models.
     * @param _pgPokemonTypeRelationModel - The Postgres Pokémon type relation models.
     * @param _pgPokemonMovementModel - The Postgres Pokémon movement models.
     * @param _pgPokemonEvolutionChainModel - The Postgres Pokémon evolution chain models.
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
     * @param creatorId The creator of the Pokémon.
     * @returns The created Pokémon.
     */
    async create(
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
        id?: number,
        creatorId?: string,
    ): Promise<Pokemon> {
        this._logger.log(`[${this.create.name}] INIT :: id: ${id}`);
        const pokemon = await this._pgPokemonModel.create({
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
            creatorId,
        });
        const pokemonId: number = id ?? pokemon.id;
        await this._pgPokemonTypeRelationModel.bulkCreate(
            pokemonTypes.map((pokemonTypeId, i) => ({
                pokemonId,
                pokemonTypeId,
                order: i + 1,
            })),
        );
        await this._pgPokemonMovementModel.bulkCreate(
            movements.map((movement) => ({
                pokemonId,
                name: movement.name,
                levelLearnedAt: movement.levelLearnedAt,
            })),
        );
        const mapped: Pokemon = PokemonMappers.DTO2Pokemon(pokemon);
        this._logger.log(`[${this.create.name}] FINISH ::`);
        return mapped;
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
     * Delete a Pokémon by its id.
     * @param id - The id of the Pokémon to delete.
     * @param userId - The owner of the Pokémon.
     * @returns True if the Pokémon was deleted, otherwise false.
     */
    async delete(id: number, userId: string): Promise<boolean> {
        this._logger.log(`[${this.delete.name}] INIT :: id: ${id}`);
        const totalDeleted = await this._pgPokemonModel.destroy({ where: { id, creatorId: userId } });
        this._logger.log(`[${this.delete.name}] FINISH ::`);
        return totalDeleted > 0;
    }

    /**
     * Get all Pokémon.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of Pokémon.
     */
    async getAll(page: number, limit: number, nameFilter?: string): Promise<Pagination<Pokemon>> {
        this._logger.log(`[${this.getAll.name}] INIT :: page: ${page}, limit: ${limit}, nameFilter: ${nameFilter}`);
        const { count, rows } = await this._pgPokemonModel.findAndCountAll({
            include: [
                {
                    model: PgPokemonTypeModel,
                    order: [['order', 'ASC']],
                },
                {
                    model: PgUserModel,
                },
            ],
            limit,
            offset: (page - 1) * limit,
            where: nameFilter ? { name: { [Op.startsWith]: nameFilter } } : undefined,
        });
        const pokemon: Pokemon[] = PokemonMappers.DTOs2Pokemon(rows);
        const pagination: Pagination<Pokemon> = new Pagination<Pokemon>(pokemon, {
            page,
            totalPages: Math.ceil(count / limit),
            total: count,
        });
        this._logger.log(`[${this.getAll.name}] FINISH ::`);
        return pagination;
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

    /**
     * Retrieves a Pokémon detail by its id.
     * @param id - The id of the Pokémon to retrieve.
     * @returns A promise that resolves to the Pokémon detail, or `undefined` if the Pokémon is not found.
     */
    async getDetailById(id: number): Promise<PokemonDetail | undefined> {
        this._logger.log(`[${this.getDetailById.name}] INIT :: id: ${id}`);
        const pokemon = await this.getById(id);
        if (!pokemon) {
            return undefined;
        }
        const movements = await this._pgPokemonMovementModel.findAll({
            where: { pokemonId: id },
        });
        const pokemonChain = await this._pgPokemonEvolutionChainModel.findOne({
            where: { pokemonId: id },
        });
        const evolutionChain = await this._pgPokemonEvolutionChainModel.findAll({
            where: { chainId: pokemonChain.chainId },
            include: [
                {
                    model: PgPokemonModel,
                    as: 'pokemon',
                },
            ],
        });
        const pokemonDetails = new PokemonDetail(
            pokemon,
            PokemonMovementMappers.DTOS2PokemonMovements(movements),
            evolutionChain.map((e) => PokemonMappers.DTO2Pokemon(e.pokemon)),
        );
        this._logger.log(`[${this.getDetailById.name}] FINISH ::`);
        return pokemonDetails;
    }

    /**
     * Get a Pokémon evolution chain by its Pokémon id.
     * @param id - The id of the Pokémon to search for.
     * @returns The Pokémon evolution chain if found, otherwise undefined.
     */
    async getEvolutionChainByPokemon(id: number): Promise<PokemonEvolutionChain> {
        this._logger.log(`[${this.getEvolutionChainByPokemon.name}] INIT :: id: ${id}`);
        const found: PgPokemonEvolutionChainModel = await this._pgPokemonEvolutionChainModel.findOne({
            where: { pokemonId: id },
        });
        const mapped: PokemonEvolutionChain = PokemonEvolutionChainMapper.DTO2EvolutionChain(found);
        this._logger.log(`[${this.getEvolutionChainByPokemon.name}] FINISH ::`);
        return mapped;
    }

    /**
     * Update a Pokémon.
     * @param id - The id of the Pokémon.
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
     * @param evolutionChain The evolution chain of the Pokémon.
     */
    async update(
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
        evolutionChain: PokemonEvolutionChain,
    ): Promise<void> {
        this._logger.log(`[${this.update.name}] INIT :: Pokémon ID: ${id}`);
        await this._pgPokemonMovementModel.destroy({ where: { pokemonId: id } });
        await this._pgPokemonTypeRelationModel.destroy({ where: { pokemonId: id } });
        await this._pgPokemonEvolutionChainModel.destroy({ where: { pokemonId: id } });
        await this._pgPokemonModel.update(
            {
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
            },
            { where: { id } },
        );
        await this._pgPokemonTypeRelationModel.bulkCreate(
            pokemonTypes.map((pokemonTypeId, i) => ({
                pokemonId: id,
                pokemonTypeId,
                order: i + 1,
            })),
        );
        await this._pgPokemonMovementModel.bulkCreate(
            movements.map((movement) => ({
                pokemonId: id,
                name: movement.name,
                levelLearnedAt: movement.levelLearnedAt,
            })),
        );
        await this._pgPokemonEvolutionChainModel.create(PokemonEvolutionChainMapper.evolutionChain2DTO(evolutionChain));
        this._logger.log(`[${this.update.name}] FINISH ::`);
    }

    /**
     * Update the pokémon autoincrement.
     * @param lastId - The last Pokémon id.
     */
    async updatePokemonAutoincrement(lastId: number): Promise<void> {
        this._logger.log(`[${this.updatePokemonAutoincrement.name}] INIT :: lastId: ${lastId}`);
        await this._pgPokemonMovementModel.sequelize.query(
            `ALTER SEQUENCE core.${PgPokemonConstants.POKEMON_TABLE_NAME}_id_seq RESTART WITH ${lastId + 1}`,
        );
        this._logger.log(`[${this.updatePokemonAutoincrement.name}] FINISH ::`);
    }

    /**
     * Create a new Pokémon type.
     * @returns The created Pokémon type.
     */
    async createPokemonTypes(): Promise<PokemonType[]> {
        this._logger.log(`[${this.createPokemonTypes.name}] INIT ::`);
        await this._pgPokemonModel.sequelize.query(`
            INSERT INTO core.pokemon_types (id, name)
            VALUES (10, 'flying'),
                   (6, 'ice'),
                   (8, 'poison'),
                   (11, 'psychic'),
                   (1, 'normal'),
                   (18, 'fairy'),
                   (5, 'electric'),
                   (13, 'rock'),
                   (12, 'bug'),
                   (17, 'steel'),
                   (16, 'dark'),
                   (2, 'fire'),
                   (3, 'water'),
                   (15, 'dragon'),
                   (14, 'ghost'),
                   (9, 'ground'),
                   (7, 'fighting'),
                   (19, 'stellar'),
                   (20, 'unknown'),
                   (4, 'grass');
        `);
        const found: PokemonType[] = await this.getAllPokemonTypes();
        this._logger.log(`[${this.createPokemonTypes.name}] FINISH ::`);
        return found;
    }
}
