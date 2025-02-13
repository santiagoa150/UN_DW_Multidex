import { ICommand } from '@nestjs/cqrs';
import { UniverseType } from '../../domain/universe-type';

/**
 * Command to update a Universe Type.
 */
export class UpdateUniverseTypeCommand implements ICommand {
    /**
     * @param universeType - The Universe Type to update.
     */
    constructor(public readonly universeType: UniverseType) {}
}
