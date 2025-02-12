import { ICommand } from '@nestjs/cqrs';
import { UniverseType } from '../../domain/universe-type';

/**
 * Event to load universe entities.
 */
export class LoadUniverseEntitiesCommand implements ICommand {
    /**
     * @param _universeType - The universe type to load entities for.
     */
    constructor(public readonly _universeType: UniverseType) {}
}
