import { UniverseEntity } from '../../../domain/universe-entity';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants';
import { Logger } from '@nestjs/common';
import { UniverseTypeNotSupportedException } from '../../../domain/exceptions/universe-type-not-supported.exception';

/**
 * Application for getting a universe entity by its id and type.
 */
export class GetUniverseEntityByIdAndTypeApplication {
    /**
     * @param _logger - The application logger.
     */
    constructor(private readonly _logger: Logger) {}

    async exec(id: string, type: UniverseTypeNameConstants): Promise<UniverseEntity> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}, type: ${type}`);
        let entity: UniverseEntity;
        switch (type) {
            case UniverseTypeNameConstants.POKEMON: {
                entity = new UniverseEntity('1', 'Blastoise', UniverseTypeNameConstants.POKEMON);
                break;
            }
            case UniverseTypeNameConstants.RICK_AND_MORTY: {
                entity = null;
                break;
            }
            default: {
                throw new UniverseTypeNotSupportedException();
            }
        }
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return entity;
    }
}
