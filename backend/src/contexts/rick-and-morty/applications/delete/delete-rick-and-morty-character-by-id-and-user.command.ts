import { ICommand } from '@nestjs/cqrs';

/**
 * Command for deleting a Rick and Morty character.
 */
export class DeleteRickAndMortyCharacterByIdAndUserCommand implements ICommand {
    /**
     * @param id - The Rick and Morty character id.
     * @param userId - The owner of the Rick and Morty character.
     */
    constructor(
        public readonly id: number,
        public readonly userId: string,
    ) {}
}
