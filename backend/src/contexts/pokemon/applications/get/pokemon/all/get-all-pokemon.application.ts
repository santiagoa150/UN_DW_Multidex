import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../../../domain/interfaces/pokemon.repository';
import { Pagination } from '../../../../../shared/domain/pagination';
import { Pokemon } from '../../../../domain/pokemon';

/**
 * `GetAllPokemonApplication` is an application service for getting all pokémon.
 */
export class GetAllPokemonApplication {
    private readonly _logger: Logger = new Logger(GetAllPokemonApplication.name);

    /**
     * @param _repository - The pokémon repository.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Executes the application.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of pokémon.
     */
    async exec(page: number, limit: number, nameFilter?: string): Promise<Pagination<Pokemon>> {
        this._logger.log(`[${this.exec.name}] INIT :: page=${page}, limit=${limit}, nameFilter=${nameFilter}`);
        const pokemon: Pagination<Pokemon> = await this._repository.getAll(page, limit, nameFilter);
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return pokemon;
    }
}
