import { IQuery } from '@nestjs/cqrs';

/**
 * Query to get a Rick and Morty character by its id.
 */
export class GetRickAndMortyCharacterByIdQuery implements IQuery {
    /**
     * @param id - The Rick and Morty character id.
     */
    constructor(public readonly id: number) {}
}
