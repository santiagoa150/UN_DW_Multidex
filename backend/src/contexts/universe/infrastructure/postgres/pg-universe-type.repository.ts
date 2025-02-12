import { UniverseTypeRepository } from '../../domain/interfaces/universe-type.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PgUniverseTypeModel } from './pg-universe-type.model';
import { UniverseType } from '../../domain/universe-type';
import { UniverseTypeMappers } from '../universe-type.mappers';

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
}
