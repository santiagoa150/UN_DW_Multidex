import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../../../domain/interfaces/pokemon.repository';
import { PokemonNotFoundException } from '../../../../domain/exceptions/pokemon-not-found.exception';
import { PokemonDetail } from 'src/contexts/pokemon/domain/pokemon-detail';

/**
 * Application service that retrieves a Pokémon detail by its ID.
 */
export class GetPokemonDetailByIdApplication {
    private readonly _logger: Logger = new Logger(GetPokemonDetailByIdApplication.name);

    /**
     * @param _repository - The Pokémon repository.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Retrieves a Pokémon detail by its ID.
     * @param id - The ID of the Pokémon to retrieve.
     * @returns The Pokémon detail.
     * @throws `PokemonNotFoundException` when the Pokémon with the specified ID was not found.
     */
    async exec(id: number): Promise<PokemonDetail> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const pokemon: PokemonDetail | undefined = await this._repository.getDetailById(id);
        if (!pokemon) throw new PokemonNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH :: id: ${id}`);
        return pokemon;
    }
}
