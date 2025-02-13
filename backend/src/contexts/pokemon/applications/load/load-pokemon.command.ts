import { ICommand } from '@nestjs/cqrs';
import { UniverseType } from '../../../universe/domain/universe-type';

/**
 * Event to load pokemon entities.
 */
export class LoadPokemonCommand implements ICommand {
    /**
     * @param universeType - The universe type to load entities for.
     */
    constructor(public readonly universeType: UniverseType) {}
}
