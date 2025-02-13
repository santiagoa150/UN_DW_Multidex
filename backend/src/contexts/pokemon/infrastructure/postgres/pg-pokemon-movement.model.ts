import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PokemonMovementDto } from '../pokemon-movement.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { PgPokemonModel } from './pg-pokemon.model';

/**
 * The Pokémon movement model for PostgresSQL.
 */
@Table({ tableName: PgPokemonConstants.POKEMON_MOVEMENTS_TABLE_NAME, timestamps: false })
export class PgPokemonMovementModel extends Model<PokemonMovementDto> implements PokemonMovementDto {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => PgPokemonModel)
    @Column({ type: DataType.INTEGER })
    pokemonId: number;

    @PrimaryKey
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    levelLearnedAt: number;

    @BelongsTo(() => PgPokemonModel)
    pokemon?: PgPokemonModel;
}
