import { Logger } from '@nestjs/common';
import { RickAndMortyRepository } from '../../../domain/interfaces/rick-and-morty.repository';
import { Pagination } from '../../../../shared/domain/pagination';
import { RickAndMortyCharacter } from '../../../domain/rick-and-morty-character';

/**
 * Application for getting all Rick and Morty characters.
 */
export class GetAllRickAndMortyCharactersApplication {
    private readonly _logger: Logger = new Logger(GetAllRickAndMortyCharactersApplication.name);

    /**
     * @param _repository - The Rick and Morty repository.
     */
    constructor(private readonly _repository: RickAndMortyRepository) {}

    /**
     * Application to get all Rick and Morty characters.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of Rick and Morty characters.
     */
    async exec(page: number, limit: number, nameFilter?: string): Promise<Pagination<RickAndMortyCharacter>> {
        this._logger.log(`[${this.exec.name}] INIT :: page=${page}, limit=${limit}, nameFilter=${nameFilter}`);
        const characters: Pagination<RickAndMortyCharacter> = await this._repository.getAllCharacters(
            page,
            limit,
            nameFilter,
        );
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return characters;
    }
}
