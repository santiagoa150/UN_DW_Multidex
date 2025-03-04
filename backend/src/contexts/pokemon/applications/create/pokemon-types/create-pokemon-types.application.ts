import { Logger } from '@nestjs/common';
import { PokemonRepository } from '../../../domain/interfaces/pokemon.repository';
import { PokemonType } from '../../../domain/pokemon-type';

/**
 * Create Pokémon Types Application.
 */
export class CreatePokemonTypesApplication {
    private readonly _logger: Logger = new Logger(CreatePokemonTypesApplication.name);

    /**
     * @param _repository - Pokémon Repository
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Execute the application.
     * @returns The created Pokémon types.
     */
    async exec(): Promise<PokemonType[]> {
        this._logger.log(`[${this.exec.name}] INIT ::`);
        const pokemonTypes = this._repository.createPokemonTypes();
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return pokemonTypes;
    }
}
