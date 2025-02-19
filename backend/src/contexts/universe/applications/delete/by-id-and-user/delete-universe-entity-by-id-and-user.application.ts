import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants';
import { CommandBus } from '@nestjs/cqrs';
import { HttpStatus, Logger } from '@nestjs/common';
import { DeletePokemonByIdAndUserCommand } from '../../../../pokemon/applications/delete/delete-pokemon-by-id-and-user.command';
import { DeleteRickAndMortyCharacterByIdAndUserCommand } from '../../../../rick-and-morty/applications/delete/delete-rick-and-morty-character-by-id-and-user.command';
import { UniverseEntityNotFoundException } from '../../../domain/exceptions/universe-entity-not-found.exception';

/**
 * Application for deleting a universe entity.
 */
export class DeleteUniverseEntityByIdAndUserApplication {
    private readonly _logger: Logger = new Logger(DeleteUniverseEntityByIdAndUserApplication.name);

    /**
     * @param _commandBus - The command bus to dispatch commands.
     */
    constructor(private readonly _commandBus: CommandBus) {}

    /**
     * Executes the `DeleteUniverseEntityByIdAndUserCommand`.
     * @param id - The id of the entity to delete.
     * @param userId - The user id.
     * @param type - The type of the entity to delete.
     */
    async exec(id: number, userId: string, type: UniverseTypeNameConstants): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}, type: ${type}`);
        try {
            switch (type) {
                case UniverseTypeNameConstants.POKEMON: {
                    await this._commandBus.execute(new DeletePokemonByIdAndUserCommand(id, userId));
                    break;
                }
                case UniverseTypeNameConstants.RICK_AND_MORTY: {
                    await this._commandBus.execute(new DeleteRickAndMortyCharacterByIdAndUserCommand(id, userId));
                    break;
                }
            }
        } catch (e) {
            if (e?.status == HttpStatus.NOT_FOUND) throw new UniverseEntityNotFoundException();
            throw e;
        }
        this._logger.log(`[${this.exec.name}] FINISH ::`);
    }
}
