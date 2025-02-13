import { PokemonRepository } from '../../../../domain/interfaces/pokemon.repository';
import { PokemonType } from '../../../../domain/pokemon-type';
import { Logger } from '@nestjs/common';
import { GetAllUniverseTypesApplication } from '../../../../../universe/applications/get/universe-type/all/get-all-universe-types.application';

/**
 * Application to get all pokémon types.
 */
export class GetAllPokemonTypesApplication {
    private readonly logger: Logger = new Logger(GetAllUniverseTypesApplication.name);

    /**
     * @param _repository - The repository for pokémon data.
     */
    constructor(private readonly _repository: PokemonRepository) {}

    /**
     * Get all pokémon types.
     * @returns All pokémon types.
     */
    exec(): Promise<PokemonType[]> {
        this.logger.log(`[${this.exec.name}] INIT ::`);
        const pokemonTypes: Promise<PokemonType[]> = this._repository.getAllPokemonTypes();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return pokemonTypes;
    }
}
