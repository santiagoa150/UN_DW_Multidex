import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PokemonEvolutionChainDto } from '../pokemon-evolution-chain.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { PgPokemonModel } from './pg-pokemon.model';

/**
 * The Pokémon evolution chain model for PostgresSQL.
 */
@Table({ tableName: PgPokemonConstants.POKEMON_EVOLUTION_CHAINS_TABLE_NAME, timestamps: false })
export class PgPokemonEvolutionChainModel extends Model<PokemonEvolutionChainDto> implements PokemonEvolutionChainDto {
    @AllowNull(false)
    @PrimaryKey
    @ForeignKey(() => PgPokemonModel)
    @Column({ type: DataType.INTEGER })
    pokemonId: number;

    @AllowNull(false)
    @Column({ type: DataType.UUID })
    chainId: string;

    @AllowNull(true)
    @ForeignKey(() => PgPokemonModel)
    @Column({ type: DataType.INTEGER })
    evolvesFrom?: number;

    @BelongsTo(() => PgPokemonModel, 'pokemonId')
    pokemon: PgPokemonModel;

    @BelongsTo(() => PgPokemonModel, 'evolvesFrom')
    evolvesFromPokemon: PgPokemonModel;
}
