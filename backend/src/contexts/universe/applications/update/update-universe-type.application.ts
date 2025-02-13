import { UniverseTypeRepository } from '../../domain/interfaces/universe-type.repository';
import { Logger } from '@nestjs/common';
import { UniverseType } from '../../domain/universe-type';

/**
 * `UpdateUniverseTypeApplication` is an application service that is responsible for updating universe type entities.
 */
export class UpdateUniverseTypeApplication {
    private readonly _logger: Logger = new Logger(UpdateUniverseTypeApplication.name);

    /**
     * @param _repository - The Universe Type repository instance.
     */
    constructor(private readonly _repository: UniverseTypeRepository) {}

    /**
     * Executes the application.
     * @param universeType - The universe type to update.
     */
    async exec(universeType: UniverseType): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: universeType: ${universeType.name}`);
        await this._repository.update(universeType);
        this._logger.log(`[${this.exec.name}] FINISH ::`);
    }
}
