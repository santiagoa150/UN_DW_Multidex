import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { Injectable, Logger } from '@nestjs/common';
import { RickAndMortyCharacter } from '../../domain/rick-and-morty-character';
import { InjectModel } from '@nestjs/sequelize';
import { PgRickAndMortyCharacterModel } from './pg-rick-and-morty-character.model';
import { RickAndMortyCharacterMappers } from '../mappers/rick-and-morty-character.mappers';
import { PgUserModel } from '../../../user/infrastructure/postgres/pg-user.model';

/**
 * The Rick and Morty repository for Postgres.
 */
@Injectable()
export class PgRickAndMortyRepository implements RickAndMortyRepository {
    private readonly _logger: Logger = new Logger(PgRickAndMortyRepository.name);

    /**
     * @param _pgCharacterModel - The Postgres Rick and Morty character model.
     */
    constructor(
        @InjectModel(PgRickAndMortyCharacterModel)
        private readonly _pgCharacterModel: typeof PgRickAndMortyCharacterModel,
    ) {}

    /**
     * Create a Rick and Morty character.
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
    async createCharacter(
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
        });
        this._logger.log(`[${this.createCharacter.name}] FINISH ::`);
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
}
