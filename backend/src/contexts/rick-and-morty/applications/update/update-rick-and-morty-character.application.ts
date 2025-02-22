import { Logger } from '@nestjs/common';
import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetRickAndMortyCharacterByIdQuery } from '../get/character-by-id/get-rick-and-morty-character-by-id.query';
import { RickAndMortyCharacter } from '../../domain/rick-and-morty-character';
import { YouAreNotTheCreatorOfTheRickAndMortyCharacterException } from '../../domain/exceptions/you-are-not-the-creator-of-the-rick-and-morty-character.exception';

/**
 * Application to update a Rick and Morty character.
 */
export class UpdateRickAndMortyCharacterApplication {
    private readonly _logger: Logger = new Logger(UpdateRickAndMortyCharacterApplication.name);

    /**
     * @param _repository - The repository.
     * @param _queryBus - The query bus.
     */
    constructor(
        private readonly _repository: RickAndMortyRepository,
        private readonly _queryBus: QueryBus,
    ) {}

    /**
     * Updates a Rick and Morty character.
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
    async exec(
        id: number,
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
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id} userId: ${userId}`);
        const character = await this._queryBus.execute<GetRickAndMortyCharacterByIdQuery, RickAndMortyCharacter>(
            new GetRickAndMortyCharacterByIdQuery(id),
        );
        if (character.creatorId !== userId) {
            throw new YouAreNotTheCreatorOfTheRickAndMortyCharacterException();
        }
        await this._repository.updateCharacter(
            id,
            name,
            type,
            frontImageUrl,
            description,
            status,
            gender,
            location,
            origin,
        );
        this._logger.log(`[${this.exec.name}] FINISH :: id: ${id}`);
    }
}
