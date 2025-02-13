import { UniverseTypeRepository } from '../../domain/interfaces/universe-type.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PgUniverseTypeModel } from './pg-universe-type.model';
import { UniverseType } from '../../domain/universe-type';
import { UniverseTypeMappers } from '../mappers/universe-type.mappers';

/**
 * The Universe Type repository for Postgres.
 */
@Injectable()
export class PgUniverseTypeRepository implements UniverseTypeRepository {
    private readonly _logger: Logger = new Logger(PgUniverseTypeRepository.name);

    /**
     * @param _model - The Postgres Universe Type model.
     */
    constructor(@InjectModel(PgUniverseTypeModel) private readonly _model: typeof PgUniverseTypeModel) {}

    /**
     * Retrieves all Universe Types.
     * @returns A promise that resolves to an array of Universe Types.
     */
    async getAll(): Promise<UniverseType[]> {
        this._logger.log(`[${this.getAll.name}] INIT ::`);
        const found: PgUniverseTypeModel[] = await this._model.findAll({ order: [['priority', 'ASC']] });
        const mapped: UniverseType[] = UniverseTypeMappers.DTOs2UniverseTypes(found);
        this._logger.log(`[${this.getAll.name}] FINISH ::`);
        return mapped;
    }

    /**
     * Update a universe type.
     * @param universeType - The universe type to update.
     */
    async update(universeType: UniverseType): Promise<void> {
        this._logger.log(`[${this.update.name}] INIT :: universeType: ${universeType.name}`);
        await this._model.update(UniverseTypeMappers.universeType2DTO(universeType), {
            where: { name: universeType.name },
        });
        this._logger.log(`[${this.update.name}] FINISH ::`);
    }
}
