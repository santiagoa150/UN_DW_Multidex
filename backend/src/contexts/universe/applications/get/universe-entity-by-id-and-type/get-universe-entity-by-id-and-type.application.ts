import { UniverseEntity } from '../../../domain/universe-entity';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants';
import { HttpStatus, Logger } from '@nestjs/common';
import { UniverseTypeNotSupportedException } from '../../../domain/exceptions/universe-type-not-supported.exception';
import { QueryBus } from '@nestjs/cqrs';
import { UniverseEntityNotFoundException } from '../../../domain/exceptions/universe-entity-not-found.exception';
import { GetPokemonByIdQuery } from '../../../../pokemon/applications/by-id/get-pokemon-by-id.query';

/**
 * Application for getting a universe entity by its id and type.
 */
export class GetUniverseEntityByIdAndTypeApplication {
    /**
     * @param _logger - The application logger.
     * @param _queryBus - The query bus to dispatch queries.
     */
    constructor(
        private readonly _logger: Logger,
        private readonly _queryBus: QueryBus,
    ) {}

    /**
     * Executes the application.
     * @param id - The entity id.
     * @param type - The entity type.
     * @returns The universe entity.
     */
    async exec(id: string, type: UniverseTypeNameConstants): Promise<UniverseEntity> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}, type: ${type}`);
        let entity: UniverseEntity;
        try {
            entity = await this.getEntity(id, type);
        } catch (e) {
            if (e?.status == HttpStatus.NOT_FOUND) throw new UniverseEntityNotFoundException();
            throw e;
        }
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return entity;
    }

    /**
     * Retrieves a universe entity by its ID and type.
     * @param id - The ID of the universe entity to retrieve.
     * @param type - The type of the universe entity to retrieve.
     * @returns The universe entity with the specified ID.
     * @throws {UniverseTypeNotSupportedException} Thrown when the specified type is not supported.
     */
    async getEntity(id: string, type: UniverseTypeNameConstants): Promise<UniverseEntity> {
        switch (type) {
            case UniverseTypeNameConstants.POKEMON: {
                return this._queryBus.execute(new GetPokemonByIdQuery(id));
            }
            case UniverseTypeNameConstants.RICK_AND_MORTY: {
                return null;
            }
            default: {
                throw new UniverseTypeNotSupportedException();
            }
        }
    }
}
