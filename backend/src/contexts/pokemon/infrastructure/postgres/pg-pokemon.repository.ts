import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PgPokemonModel } from './pg-pokemon.model';
import { Pokemon } from '../../domain/pokemon';
import { PokemonMappers } from '../pokemon.mappers';

/**
 * The Pokémon repository for Postgres.
 */
@Injectable()
export class PgPokemonRepository implements PokemonRepository {
    /**
     * @param _logger - Class used for logging.
     * @param _pgPokemonModel - The Postgres Pokémon model.
     */
    constructor(
        private readonly _logger: Logger,
        @InjectModel(PgPokemonModel) private readonly _pgPokemonModel: typeof PgPokemonModel,
    ) {}

    /**
     * Retrieves a Pokémon by its id.
     * @param id - The id of the Pokémon to retrieve.
     * @returns A promise that resolves to the Pokémon, or `undefined` if the Pokémon is not found.
     */
    async getById(id: number): Promise<Pokemon | undefined> {
        this._logger.log(`[${this.getById.name}] INIT :: id: ${id}`);
        const found: PgPokemonModel = await this._pgPokemonModel.findOne({ where: { id } });
        const mapped: Pokemon | undefined = found ? PokemonMappers.DTO2Pokemon(found) : undefined;
        this._logger.log(`[${this.getById.name}] FINISH ::`);
        return mapped;
    }
}
