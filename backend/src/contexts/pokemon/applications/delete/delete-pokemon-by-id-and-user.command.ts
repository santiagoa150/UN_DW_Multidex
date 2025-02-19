import { ICommand } from '@nestjs/cqrs';

/**
 * Command for deleting a pokémon.
 */
export class DeletePokemonByIdAndUserCommand implements ICommand {
    /**
     * @param id - The id of the pokémon to delete.
     * @param userId - The user id.
     */
    constructor(
        public readonly id: number,
        public readonly userId: string,
    ) {}
}
