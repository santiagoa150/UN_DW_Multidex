import { UniverseTypeRepository } from '../../../../domain/interfaces/universe-type.repository';
import { Logger } from '@nestjs/common';
import { UniverseType } from '../../../../domain/universe-type';

/**
 * Application to get all universe types.
 */
export class GetAllUniverseTypesApplication {
    private readonly _logger = new Logger(GetAllUniverseTypesApplication.name);

    /**
     * @param _repository - The universe type repository.
     */
    constructor(private readonly _repository: UniverseTypeRepository) {}

    /**
     * Get all universe types.
     * @returns All universe types.
     */
    async exec(): Promise<UniverseType[]> {
        this._logger.log(`[${this.exec.name}] INIT ::`);
        const universeTypes: Promise<UniverseType[]> = this._repository.getAll();
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return universeTypes;
    }
}
