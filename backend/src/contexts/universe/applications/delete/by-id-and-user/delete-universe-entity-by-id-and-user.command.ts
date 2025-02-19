import { ICommand } from '@nestjs/cqrs';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants';

/**
 * Command for deleting a universe entity.
 */
export class DeleteUniverseEntityByIdAndUserCommand implements ICommand {
    /**
     * Initializes a new instance of the `DeleteUniverseEntityByIdAndUserCommand` class.
     * @param id - The universe entity id.
     * @param userId - The user id.
     * @param universeType - The universe type.
     */
    constructor(
        public readonly id: number,
        public readonly userId: string,
        public readonly universeType: UniverseTypeNameConstants,
    ) {}
}
