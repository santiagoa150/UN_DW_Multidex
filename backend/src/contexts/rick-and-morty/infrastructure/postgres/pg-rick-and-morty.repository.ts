import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { Injectable, Logger } from '@nestjs/common';
import { RickAndMortyCharacter } from '../../domain/rick-and-morty-character';
import { InjectModel } from '@nestjs/sequelize';
import { PgRickAndMortyCharacterModel } from './pg-rick-and-morty-character.model';
import { RickAndMortyCharacterMappers } from '../rick-and-morty-character.mappers';

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
     * Retrieves a Rick and Morty character by its ID.
     * @param id - The ID of the character to retrieve.
     * @returns The character with the specified ID, or `undefined` if no character was found.
     */
    async getCharacterById(id: number): Promise<RickAndMortyCharacter | undefined> {
        this._logger.log(`[${this.getCharacterById.name}] INIT :: id: ${id}`);
        const found: PgRickAndMortyCharacterModel = await this._pgCharacterModel.findOne({ where: { id } });
        const mapped: RickAndMortyCharacter | undefined = found
            ? RickAndMortyCharacterMappers.DTO2RickAndMortyCharacter(found)
            : undefined;
        this._logger.log(`[${this.getCharacterById.name}] FINISH ::`);
        return mapped;
    }
}
