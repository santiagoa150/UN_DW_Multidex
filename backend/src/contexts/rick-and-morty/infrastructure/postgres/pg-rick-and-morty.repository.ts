import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { Injectable, Logger } from '@nestjs/common';
import { RickAndMortyCharacter } from '../../domain/rick-and-morty-character';
import { InjectModel } from '@nestjs/sequelize';
import { PgRickAndMortyCharacterModel } from './pg-rick-and-morty-character.model';
import { RickAndMortyCharacterMappers } from '../mappers/rick-and-morty-character.mappers';
import { PgUserModel } from '../../../user/infrastructure/postgres/pg-user.model';
import { Pagination } from '../../../shared/domain/pagination';
import { Op } from 'sequelize';
import { PgRickAndMortyConstants } from './pg-rick-and-morty.constants';

/**
 * The Rick and Morty repository for Postgres.
 */
@Injectable()
export class PgRickAndMortyRepository implements RickAndMortyRepository {
    private readonly _logger: Logger = new Logger(PgRickAndMortyRepository.name);

    /**
     * @param _pgCharacterModel - The Postgres Rick and Morty character models.
     */
    constructor(
        @InjectModel(PgRickAndMortyCharacterModel)
        private readonly _pgCharacterModel: typeof PgRickAndMortyCharacterModel,
    ) {}

    /**
     * Create a Rick and Morty character.
     * @param name - The name of the character.
     * @param type - The type of the character.
     * @param frontImageUrl - The URL of the character's front image.
     * @param description - The description of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param location - The location of the character.
     * @param origin - The origin of the character.
     * @param [id] - The ID of the character.
     * @param [creatorId] - The creator ID.
     */
    async createCharacter(
        name: string,
        type: string,
        frontImageUrl: string,
        description: string,
        status: string,
        gender: string,
        location: string,
        origin: string,
        id?: number,
        creatorId?: string,
    ): Promise<void> {
        this._logger.log(`[${this.createCharacter.name}] INIT :: id: ${id}`);
        await this._pgCharacterModel.create({
            id,
            name,
            status,
            gender,
            location,
            origin,
            frontImageUrl,
            description,
            entityType: type,
            creatorId,
        });
        this._logger.log(`[${this.createCharacter.name}] FINISH ::`);
    }

    /**
     * Delete a Rick and Morty character by its ID.
     * @param id - The ID of the character to delete.
     * @param userId - The owner of the character.
     * @returns `true` if the character was deleted, `false` otherwise.
     */
    async delete(id: number, userId: string): Promise<boolean> {
        this._logger.log(`[${this.delete.name}] INIT :: id: ${id}`);
        const totalDeleted = await this._pgCharacterModel.destroy({ where: { id, creatorId: userId } });
        this._logger.log(`[${this.delete.name}] FINISH ::`);
        return totalDeleted > 0;
    }

    /**
     * Get all Rick and Morty characters.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of Rick and Morty characters.
     */
    async getAllCharacters(
        page: number,
        limit: number,
        nameFilter?: string,
    ): Promise<Pagination<RickAndMortyCharacter>> {
        this._logger.log(
            `[${this.getAllCharacters.name}] INIT :: page: ${page}, limit: ${limit}, nameFilter: ${nameFilter}`,
        );
        const { count, rows } = await this._pgCharacterModel.findAndCountAll({
            include: [
                {
                    model: PgUserModel,
                },
            ],
            limit,
            offset: (page - 1) * limit,
            where: nameFilter ? { name: { [Op.startsWith]: nameFilter } } : undefined,
        });
        const characters: RickAndMortyCharacter[] = RickAndMortyCharacterMappers.DTOs2RickAndMortyCharacters(rows);
        const pagination: Pagination<RickAndMortyCharacter> = new Pagination<RickAndMortyCharacter>(characters, {
            page,
            totalPages: Math.ceil(count / limit),
            total: count,
        });
        this._logger.log(`[${this.getAllCharacters.name}] FINISH ::`);
        return pagination;
    }

    /**
     * Retrieves a Rick and Morty character by its ID.
     * @param id - The ID of the character to retrieve.
     * @returns The character with the specified ID, or `undefined` if no character was found.
     */
    async getCharacterById(id: number): Promise<RickAndMortyCharacter | undefined> {
        this._logger.log(`[${this.getCharacterById.name}] INIT :: id: ${id}`);
        const found: PgRickAndMortyCharacterModel = await this._pgCharacterModel.findOne({
            include: [
                {
                    model: PgUserModel,
                },
            ],
            where: { id },
        });
        const mapped: RickAndMortyCharacter | undefined = found
            ? RickAndMortyCharacterMappers.DTO2RickAndMortyCharacter(found)
            : undefined;
        this._logger.log(`[${this.getCharacterById.name}] FINISH ::`);
        return mapped;
    }

    /**
     * Update a Rick and Morty character.
     * @param id - The ID of the character.
     * @param name - The name of the character.
     * @param type - The type of the character.
     * @param frontImageUrl - The URL of the character's front image.
     * @param description - The description of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param location - The location of the character.
     * @param origin - The origin of the character.
     */
    async updateCharacter(
        id: number,
        name: string,
        type: string,
        frontImageUrl: string,
        description: string,
        status: string,
        gender: string,
        location: string,
        origin: string,
    ): Promise<void> {
        this._logger.log(`[${this.updateCharacter.name}] INIT :: name: ${name}`);
        await this._pgCharacterModel.update(
            {
                name,
                status,
                gender,
                location,
                origin,
                frontImageUrl,
                description,
                entityType: type,
            },
            { where: { id } },
        );
        this._logger.log(`[${this.updateCharacter.name}] FINISH ::`);
    }

    /**
     * Update the last ID of the character autoincrement.
     * @param lastId - The last ID of the character.
     */
    async updateCharacterAutoincrement(lastId: number): Promise<void> {
        this._logger.log(`[${this.updateCharacterAutoincrement.name}] INIT :: lastId: ${lastId}`);
        await this._pgCharacterModel.sequelize.query(
            `ALTER SEQUENCE core.${PgRickAndMortyConstants.CHARACTERS_TABLE_NAME}_id_seq RESTART WITH ${lastId + 1}`,
        );
        this._logger.log(`[${this.updateCharacterAutoincrement.name}] FINISH ::`);
    }
}
