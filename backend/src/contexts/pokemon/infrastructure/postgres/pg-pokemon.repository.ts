import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PgPokemonModel } from './pg-pokemon.model';
import { Pokemon } from '../../domain/pokemon';
import { PokemonMappers } from '../pokemon.mappers';
import { PgPokemonTypeModel } from './pg-pokemon-type.model';

/**
 * The Pokémon repository for Postgres.
 */
@Injectable()
export class PgPokemonRepository implements PokemonRepository {
    private readonly _logger: Logger = new Logger(PgPokemonRepository.name);

    /**
     * @param _pgPokemonModel - The Postgres Pokémon model.
     */
    constructor(@InjectModel(PgPokemonModel) private readonly _pgPokemonModel: typeof PgPokemonModel) {}

    /**
     * Retrieves a Pokémon by its id.
     * @param id - The id of the Pokémon to retrieve.
     * @returns A promise that resolves to the Pokémon, or `undefined` if the Pokémon is not found.
     */
    async getById(id: number): Promise<Pokemon | undefined> {
        this._logger.log(`[${this.getById.name}] INIT :: id: ${id}`);
        const found: PgPokemonModel = await this._pgPokemonModel.findOne({
            where: { id },
            include: [
                {
                    model: PgPokemonTypeModel,
                    order: [['order', 'ASC']],
                },
            ],
        });
        const mapped: Pokemon | undefined = found ? PokemonMappers.DTO2Pokemon(found) : undefined;
        this._logger.log(`[${this.getById.name}] FINISH ::`);
        return mapped;
    }
}
