import { UniverseTypeRepository } from '../../domain/interfaces/universe-type.repository';
import { Logger } from '@nestjs/common';
import { UniverseType } from '../../domain/universe-type';

/**
 * Application to create universe types.
 */
export class CreateUniverseTypesApplication {
    private readonly _logger: Logger = new Logger(CreateUniverseTypesApplication.name);

    /**
     * @param repository - The universe type repository.
     */
    constructor(private readonly repository: UniverseTypeRepository) {}

    async exec(): Promise<UniverseType[]> {
        this._logger.log(`[${this.exec.name}] INIT ::`);
        const universeTypes = this.repository.createUniverseTypes();
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return universeTypes;
    }
}
