import { ICommand } from '@nestjs/cqrs';

/**
 * Command to update a Rick and Morty character.
 */
export class UpdateRickAndMortyCharacterCommand implements ICommand {
    /**
     * @param id - The character ID.
     * @param userId - The user ID.
     * @param description - The character description.
     * @param frontImageUrl - The URL of the image that represents the character.
     * @param gender - The character gender.
     * @param location - The character location.
     * @param name - The character name.
     * @param origin - The character origin.
     * @param status - The character status.
     * @param type - The character type.
     */
    constructor(
        public readonly id: number,
        public readonly userId: string,
        public readonly description: string,
        public readonly frontImageUrl: string,
        public readonly gender: string,
        public readonly location: string,
        public readonly name: string,
        public readonly origin: string,
        public readonly status: string,
        public readonly type: string,
    ) {}
}
