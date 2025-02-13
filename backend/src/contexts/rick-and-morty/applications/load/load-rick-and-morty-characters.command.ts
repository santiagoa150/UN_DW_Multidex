import { ICommand } from '@nestjs/cqrs';
import { UniverseType } from '../../../universe/domain/universe-type';

/**
 * Event to load rick and morty characters entities.
 */
export class LoadRickAndMortyCharactersCommand implements ICommand {
    /**
     * @param universeType - The universe type to load entities for.
     */
    constructor(public readonly universeType: UniverseType) {}
}
