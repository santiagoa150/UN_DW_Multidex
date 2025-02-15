import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../../../domain/interfaces/pokemon.repository';
import { Pokemon } from '../../../../domain/pokemon';
import { PokemonNotFoundException } from '../../../../domain/exceptions/pokemon-not-found.exception';
import { PokemonDetails } from 'src/contexts/pokemon/domain/pokemon-details';

export class GetPokemonDetailsByIdApplication {
    private readonly _logger: Logger = new Logger(GetPokemonDetailsByIdApplication.name);

    constructor(private readonly _repository: PokemonRepository) {}

    async exec(id: number): Promise<PokemonDetails> {
        this._logger.log(`[${this.exec.name}] INIT :: id: ${id}`);
        const pokemon: PokemonDetails | undefined = await this._repository.getDetailsById(id);
        if (!pokemon) throw new PokemonNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH :: id: ${id}`);
        return pokemon;
    }
}
