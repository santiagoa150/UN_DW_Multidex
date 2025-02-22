import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { Logger } from '@nestjs/common';

/**
 * Application to create a Rick and Morty character.
 */
export class CreateRickAndMortyCharacterApplication {
    private readonly _logger: Logger = new Logger(CreateRickAndMortyCharacterApplication.name);

    /**
     * @param _repository The repository.
     */
    constructor(private readonly _repository: RickAndMortyRepository) {}

    /**
     * Creates a Rick and Morty character.
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
    async exec(
        userId: string,
        description: string,
        frontImageUrl: string,
        gender: string,
        location: string,
        name: string,
        origin: string,
        status: string,
        type: string,
    ): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: character name: ${name}`);
        await this._repository.createCharacter(
            name,
            type,
            frontImageUrl,
            description,
            status,
            gender,
            location,
            origin,
            undefined,
            userId,
        );
        this._logger.log(`[${this.exec.name}] FINISH :: character name: ${name}`);
    }
}
