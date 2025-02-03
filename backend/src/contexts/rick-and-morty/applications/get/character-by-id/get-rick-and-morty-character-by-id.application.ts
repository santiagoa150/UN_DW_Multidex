import { RickAndMortyRepository } from '../../../domain/interfaces/rick-and-morty.repository';
import { Logger } from '@nestjs/common';
import { RickAndMortyCharacter } from '../../../domain/rick-and-morty-character';
import { RickAndMortyCharacterNotFoundException } from '../../../domain/exceptions/rick-and-morty-character-not-found.exception';

/**
 * Application for getting a Rick and Morty character by its ID.
 */
export class GetRickAndMortyCharacterByIdApplication {
    private readonly _logger: Logger = new Logger(GetRickAndMortyCharacterByIdApplication.name);

    /**
     * @param _repository - The Rick and Morty repository.
     */
    constructor(private readonly _repository: RickAndMortyRepository) {}

    /**
     * Executes the application.
     * @param id - The character ID.
     * @returns The Rick and Morty character.
     * @throws {RickAndMortyCharacterNotFoundException} Thrown when the character is not found.
     */
    async exec(id: number): Promise<RickAndMortyCharacter> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const character: RickAndMortyCharacter | undefined = await this._repository.getCharacterById(id);
        if (!character) throw new RickAndMortyCharacterNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH :: id: ${id}`);
        return character;
    }
}
